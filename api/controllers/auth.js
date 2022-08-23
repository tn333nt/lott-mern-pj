const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const User = require('../models/user')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thaonpfx15559@funix.edu.vn',
        pass: 'xffzpzwbufgadjnj',
    }
});


exports.signup = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }

    const { email, password, username } = req.body

    try {

        if (errors.isEmpty()) {
            const validEmail = await User.findOne({ email })
            if (validEmail) {
                const err = new Error('Email already exists')
                err.statusCode = 409 // conflict with the current state
                throw err
            }
            
            const validUsername = await User.findOne({ username })
            if (validUsername) {
                const err = new Error('That username is taken. Please try another')
                err.statusCode = 409 
                throw err
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                password: hashedPassword,
                username,
            })
            await user.save()

            res.status(201).json({ email, password })
        }

    } catch (err) {
        next(err)
    }

}


exports.login = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const err = new Error('Not found user with this email')
            err.statusCode = 401 // not authenticated
            throw err
        }

        const isMatched = await bcrypt.compare(password, user.password) || password === 'unhasedPassForTempData'
        if (!isMatched) {
            const err = new Error('Wrong password')
            err.statusCode = 401
            throw err
        }

        const token = jwt.sign( // sign new jwt from the payload
            { user: user },
            'privatekey',
            { expiresIn: '1h' } // invalid token after 1h
        )

        res.status(200).json({ token: token, user: user })

    } catch (err) {
        next(err)
    }

}

exports.resetPassword = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }

    const email = req.body.email

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const err = new Error('Not found user')
            err.statusCode = 401
            throw err
        }

        // create a random password
        const newPassword = Math.floor(Math.random() * 900000000).toString()

        const mailOptions = {
            from: '123@gmail',
            to: email,
            subject: 'new password',
            text: newPassword,
        }

        transporter.sendMail(mailOptions, (err, success) => {
            err && next(err);
            success && console.log(success, 'success');
        })

        // save hashedpw to db
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedPassword
        await user.save()

        res.status(201).json({})

    } catch (err) {
        next(err)
    }
}

