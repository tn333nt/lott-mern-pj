const { validationResult } = require('express-validator')

const User = require('../models/user')
const Result = require('../models/result')

exports.postTicket = async (req, res, next) => {
    const { date, value, wonPrizes } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }

    if (date === '' || date === 'Invalid Date' || !date) {
        const err = new Error('Checking date is required')
        err.statusCode = 422
        return next(err)
    }

    try {

        const checkingResult = await Result.find({ date: date })
        // findAll return arr 
        if (checkingResult.length <= 0) {
            const err = new Error('Not found result of that date')
            err.statusCode = 404
            throw err
        }

        const user = await User.findById(req.user._id)
        // findOne return 1 obj (doc) or null
        if (!user) {
            const err = new Error('Not authenticated you')
            err.statusCode = 401
            throw err
        }

        const check = { date, value, wonPrizes }
        user.historyCheck.push(check)
        await user.save()

        res.status(201).json({ user: user })

    } catch (err) {
        console.log(err, 909099)
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

        // later : send msg from here
        res.status(200).json({ user: user })

    } catch (err) {
        // why does not pass msg to fe ???
        console.log(err.message, 9090909090)
        next(err)
    }
}

// exports.deleteTicket = async (req, res, next) => {

//     try {
//         const user = await User.findById(req.user._id)
//         if (!user) {
//             const err = new Error('Not found user')
//             err.statusCode = 401
//             throw err
//         }

//         // roi phai tim index cua ticket de slice()
//         // or map arr without this check (pb by _id)
//         // de sau di
//         await user.save()

//     } catch (err) {
//         next(err)
//     }
// }
