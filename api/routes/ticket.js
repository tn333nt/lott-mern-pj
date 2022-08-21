const express = require('express')
const { body } = require('express-validator')

const ticketController = require('../controllers/ticket')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.post('/ticket', [
    body('value')
        .notEmpty()
        .withMessage('Checking ticket is required')
        .trim()
        .isLength({ min: 6, max: 6 })
        .withMessage('Ticket requires 6 digits long')
        .isNumeric()
        .withMessage('Ticket only contains numbers')
], isAuth, ticketController.postTicket)

router.delete('/tickets', isAuth, ticketController.deleteAllTickets)

// router.delete('/ticket', isAuth, ticketController.deleteTicket)

module.exports = router
