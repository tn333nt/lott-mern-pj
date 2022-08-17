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
        .withMessage('6 characters minimum')
    , body('confirmPassword')
        .custom((value, { req }) => {
            if (value === req.body.password) {
                return true
            }
            throw new Error('Passwords did not match')
        })
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