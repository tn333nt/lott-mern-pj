const express = require('express')
const { body } = require('express-validator')

const userController = require('../controllers/user')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')

const router = express.Router()
router.get('/users', userController.getAllUsers)

router.delete('/users', userController.deleteAllUsers)
router.delete('/user/:userId', isAuth, isAdmin, userController.deleteUser)

router.patch('/user/:userId', isAuth, isAdmin, userController.setAdmin)

router.patch('/changePassword', [
    body('oldPassword')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
    , body('newPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('New password requires 6 characters minimum')
], isAuth, userController.changePassword)


router.put('/user', [
    body('username')
        .trim()
        .matches(/[^d]/)
        .withMessage('Username must include at least 1 letter')
        .isLength({ min: 3 })
        .withMessage('Username must have at least 3 characters')

    , body('fullName')
        .custom((value, { req }) => {
            if (!value || /^[a-zA-Z\s]+[\s{3}]*$/.test(+value)) {
                if (!value || value.trim().length >= 6 && value.trim().length <= 99) {
                    return true
                }
                throw new Error('Your name must have at least 6 characters')
            }
            throw new Error('Fullname must be a string')
        })

    , body('age')
        // custom to take the not-fillin case
        .custom((value, { req }) => {
            if (!value || /^[\d]*$/.test(+value)) {
                if (!value || +value >= 9 && +value <= 99) {
                    return true
                }
                throw new Error('Your age must be more than 9 and fewer than 99')
            }
            throw new Error('Age requires numbers')
        })

    , body('mobile')
        .custom((value, { req }) => {
            // https://regex101.com/r/dQTmw8/1
            if (!value || /\(?([0-9]{2,3})\)?([ .-]?)([0-9]{2,4})?([ .-]?)([0-9]{2,4})?([ .-]?)([0-9]{0,2})/.test(value)) {
                if (!value || value.trim().length >= 6 && value.trim().length <= 15) {
                    return true
                }
                throw new Error('Mobile must have more than 9 and fewer than 15 characters')
            }
            throw new Error('Invalid mobile')
        })

    , body('country')
        .custom((value, { req }) => {
            if (!value || /^[^d]*$/.test(value.trim())) {
                if (!value || value.length >= 2 && value.length <= 99) {
                    return true
                }
                throw new Error('Country must have at least 2 characters')
            }
            throw new Error('Invalid country')
        })

    , body('city')
        .custom((value, { req }) => {
            if (!value || /^[a-zA-Z\s]*$/.test(value.trim())) {
                if (!value || value.length >= 2 && value.length <= 99) {
                    return true
                }
                throw new Error('City must have at least 2 characters')
            }
            throw new Error('Invalid city')
        })

    , body('address')
        .custom((value, { req }) => {
            if (!value || /^[#'.0-9a-zA-Z\s,-]+$/.test(value)) {
                if (!value || value.trim().length >= 6 && value.trim().length <= 99) {
                    return true
                }
                throw new Error('Address must have at least 6 characters')
            }
            throw new Error('Invalid address format')
        })

    , body('postalCode')
        .custom((value, { req }) => {
            if (!value || /^[0-9a-zA-Z\s-]+$/.test(value)) {
                if (!value || value.trim().length >= 3 && value.trim().length <= 15) {
                    return true
                }
                throw new Error('Postal code must have at least 3 characters')
            }
            throw new Error('postal code')
        })

], isAuth, userController.updateUser)


module.exports = router
