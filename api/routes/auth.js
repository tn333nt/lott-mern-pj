const express = require('express')
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router()

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('incorrect email')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value })
            user && Promise.reject('email already exists')
        })
    , body('password')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 6 })
    , body('confirmPassword')
        .custom((value, { req }) => {
            if (value === req.body.password) {
                return true
            }
            throw new Error('check the confirm')
        })
], authController.signup)

router.post('/login', authController.login)

router.patch('/resetPassword', authController.resetPassword)

module.exports = router