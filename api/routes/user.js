const express = require('express')
const { body } = require('express-validator')

const userController = require('../controllers/user')

const router = express.Router()

router.get('/users', userController.getAllUsers)

router.delete('/users', userController.deleteAllUsers)

router.delete('/user/:userId', userController.deleteUser)

router.post('/user', userController.postUser)

router.patch('/user/:userId', userController.patchUser)

module.exports = router
