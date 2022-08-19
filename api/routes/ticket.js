const express = require('express')
const { body } = require('express-validator')

const ticketController = require('../controllers/ticket')
const isAuth = require('../middleware/isAuth')

const router = express.Router()
// talk to all tickets in history check of user
// router.get('/tickets', isAuth, ticketController.getAllTickets) // ma co user la co his r con dau

// add check
router.post('/ticket', [
    body('value')
        .trim()
        .notEmpty()
        .withMessage('Checking ticket is required')
        .isLength({ min: 6, max: 6 })
        .withMessage('Ticket requires 6 digits long')
        .isNumeric()
        .withMessage('Ticket only contains numbers')
    , body('date')
        .trim()
        .notEmpty()
        .withMessage('Checking date is required')

], isAuth, ticketController.postTicket)

router.post('/ticket', [
    body('value')
        .trim()
        .notEmpty()
        .withMessage('Checking ticket is required')
        .isLength({ min: 6, max: 6 })
        .withMessage('Ticket requires 6 digits long')
        .isNumeric()
        .withMessage('Ticket only contains numbers')
    // , body('date')
    //     .notEmpty()
    //     .not().isIn(['Invalid Date'])
    //     .withMessage('Checking date is required 462974')
    //     .custom(value => console.log(value, 2475238))

], isAuth, ticketController.postTicket)
// delete history
router.delete('/tickets', isAuth, ticketController.deleteAllTickets)

// router.delete('/ticket', isAuth, ticketController.deleteTicket)

module.exports = router
