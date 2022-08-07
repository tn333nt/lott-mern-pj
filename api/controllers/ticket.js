const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.postTicket = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id })

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(`validation failed at ${error.param} : ${error.msg}`)
        err.statusCode = 422
        throw err
    }

    const value = req.body.value
    const date = req.body.date
    const prize = req.body.win

    try {
        const user = {
            value: value,
            date: date,
            win: win
        }

        await user.save()

        const updatedUsers = await User.find()

        const paginatedUsers = await User.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            users: updatedUsers,
            paginatedUsers: paginatedUsers
        })

    } catch (err) {
        next(err)
    }
    try {
        if (!user) {
            const err = new Error('Not authorized');
            err.statusCode = 403;
            throw err;
        }

        user.historyCheck.length = 0
        await user.save()
        
    } catch (err) {
        next(err)
    }
}

exports.deleteAllTickets = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id })

    try {
        if (!user) {
            const err = new Error('Not authorized');
            err.statusCode = 403;
            throw err;
        }

        user.historyCheck.length = 0
        await user.save()
        
    } catch (err) {
        next(err)
    }
}

// exports.deleteTicket = async (req, res, next) => {
//     const user = await User.findOne({ _id: req.user._id })

//     try {
//         if (!user) {
//             const err = new Error('Not authorized');
//             err.statusCode = 403;
//             throw err;
//         }

//         user.historyCheck.pop()
//         // roi phai tim index cua ticket de slice()
//         // de sau di
//         await user.save()

//     } catch (err) {
//         next(err)
//     }
// }
