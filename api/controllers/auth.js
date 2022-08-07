const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') // to create new jwt conveniently

const User = require('../models/user')

exports.signup = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('validation failed')
        err.statusCode = 422
        throw err
    }

    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    try {
        const isMatched = password === confirmPassword
        if (!isMatched) {
            const err = new Error('passwords did not match')
            err.statusCode = 422
            throw err
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPassword
        })
        await user.save()

        res.status(201).json({ user: user })

    } catch (err) {
        next(err)
    }

}


exports.login = async (req, res, next) => {

    const email = req.body.email
    const password = req.body.password

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const err = new Error('no found user with this email')
            err.statusCode = 401 // not authenticated
            throw err
        }

        // const isMatched = await bcrypt.compare(password, user.password)
        const isMatched = password == 123123
        if (!isMatched) {
            const err = new Error('wrong password')
            err.statusCode = 401
            throw err
        }

        const token = jwt.sign( // sign new jwt from the payload
            { user: user },
            'privatekey',
            { expiresIn: '1h' } // invalid token after 1h
        )

        console.log(user, 111)
        console.log(token, 222)

        res.status(200).json({ token: token, user: user })

    } catch (err) {
        next(err)
    }

}

exports.resetPassword = async (req, res, next) => {
    const userId = req.user._id

    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword

    try {
        const user = await User.findById(userId)
        if (!user) {
            const err = new Error('no found user')
            err.statusCode = 404
            throw err
        }
        
        // compare old pw with data in db
        const isValid = await bcrypt.compare(oldPassword, user.password)
        // const isValid = +oldPassword === +123123
        if (!isValid) {
            const err = new Error('wrong password')
            err.statusCode = 401
            throw err
        }
        
        // compare new pw with confirm
        const isMatched = newPassword === confirmPassword
        if (!isMatched) {
            const err = new Error('passwords did not match')
            err.statusCode = 422
            throw err
        }

        console.log(isValid, isMatched)

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedPassword
        await user.save()

        res.status(201).json({ user: user })

    } catch (err) {
        next(err)
    }
}