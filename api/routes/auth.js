const express = require('express')
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router()

router.put('/signup', [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Incorrect email')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            console.log(value, 'value')
            const user = await User.findOne({ email: value })
            console.log(user, 'user')
            // user && Promise.reject('Email already exists')
            if (!user) {
                return true
            } else {
                throw new Error('Email already exists')
            }
        })
    , body('password')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 6 })
        .withMessage('6 characters minimum')
    , body('confirmPassword')
        .custom((value, { req }) => {
            if (value === req.body.password) {
                return true
            }
            throw new Error('Passwords did not match')
        })
], authController.signup)

router.post('/login', authController.login)

router.patch('/resetPassword', authController.resetPassword)

module.exports = router