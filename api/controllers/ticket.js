const { validationResult } = require('express-validator')

const User = require('../models/user')
const Result = require('../models/result')

exports.postTicket = async (req, res, next) => {
    const { date, value, wonPrize } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors, 86896)
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        next(err)
    }
console.log(date, 'date')
    if (date === '' || date === 'Invalid Date' || !date) {
        const err = new Error('Checking date is required')
        err.statusCode = 422
        next(err)
    }


    try {

        const checkingResult = await Result.find({ date: date })
        if (!checkingResult) {
            const err = new Error('Not found result of that date')
            err.statusCode = 404
            throw err
        }

        const user = await User.findById(req.user._id)
        if (!user) {
            const err = new Error('Not authenticated you')
            err.statusCode = 401
            throw err
        }

        const check = { date, value, wonPrize }
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
        if (user.historyCheck.length <= 0) {
            const err = new Error('Not found history to delete')
            err.statusCode = 404
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
