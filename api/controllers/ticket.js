const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.postTicket = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)

        err.statusCode = 422
        throw err
    }

    const date = req.body.date
    const value = req.body.value
    const wonPrize = req.body.wonPrize

    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            const err = new Error('Not found user')
            err.statusCode = 401
            throw err
        }

        const check = {
            date: date,
            value: value,
            wonPrize: wonPrize
        }

        user.historyCheck.push(check)
        await user.save()

        res.status(201).json({ user: user })

    } catch (err) {
        next(err)
    }
}

exports.deleteAllTickets = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            const err = new Error('Not found user')
            err.statusCode = 401
            throw err
        }

        user.historyCheck = []
        await user.save()

        res.status(200).json({ user: user })

    } catch (err) {
        next(err)
    }
}

// exports.deleteTicket = async (req, res, next) => {
//     const user = await User.findOne({ _id: req.user._id })

//     try {
//         if (!user) {
//             const err = new Error('Not found user');
//             err.statusCode = 401;
//             throw err;
//         }

//         // roi phai tim index cua ticket de slice()
//         // de sau di
//         await user.save()

//     } catch (err) {
//         next(err)
//     }
// }
