const express = require('express')
const { body } = require('express-validator')

const userController = require('../controllers/user')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')

const router = express.Router()
// de fetch to valadate luc !isAuth
// de tam thoi khi nao xu ly err combine smoothly dc thi bo
router.get('/users', userController.getAllUsers)

router.delete('/user/:userId', isAuth, isAdmin, userController.deleteUser)

router.patch('/user/:userId', isAuth, isAdmin, userController.setAdmin)

router.patch('/changePassword', isAuth, userController.changePassword)

router.delete('/users', userController.deleteAllUsers)

module.exports = router
