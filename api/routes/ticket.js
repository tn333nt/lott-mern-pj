const express = require('express')

const ticketController = require('../controllers/ticket')
const isAuth = require('../middleware/isAuth')

const router = express.Router()
// talk to all tickets in history check of user
// router.get('/tickets', isAuth, ticketController.getAllTickets) // ma co user la co his r con dau

// add check
router.post('/ticket', isAuth, ticketController.postTicket)
// delete history
router.delete('/tickets', isAuth, ticketController.deleteAllTickets)

// router.delete('/ticket', isAuth, ticketController.deleteTicket)

module.exports = router
