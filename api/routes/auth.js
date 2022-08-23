const express = require('express')
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router()

router.put('/signup', [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Incorrect email')
        .normalizeEmail()
    , body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must have at least 6 characters')
    , body('confirmPassword')
        .custom((value, { req }) => {
            if (value === req.body.password) {
                return true
            }
            throw new Error('Passwords did not match')
        })
    , body('username')
        .trim()
        .matches(/[^d]/)
        .withMessage('Username must include at least 1 letter')
        .isLength({ min: 3 })
        .withMessage('Username must have at least 3 characters')

], authController.signup)


router.post('/login', [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Incorrect email')
        .normalizeEmail()
    , body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('6 characters minimum')
], authController.login)


router.patch('/resetPassword', [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Incorrect email')
        .normalizeEmail()
], authController.resetPassword)

module.exports = router