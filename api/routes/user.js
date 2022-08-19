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


module.exports = router
