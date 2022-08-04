
const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const resultController = require('../controllers/result')

router.get('/results', [
    body('jackpot'),
    body('firsttPrizes'),
    body('secondPrizes'),
    body('thirdPrizes'),
    body('fourthPrizes'),
    body('fifthPrizes'),
], resultController.getAllResults)

router.post('/results', [], resultController.deleteAllResults)

router.post('/result', [], resultController.postResult)

router.patch('/result/:resultId', [], resultController.patchResult)

router.delete('/result/:resultId', [], resultController.deleteResult)

module.exports = router