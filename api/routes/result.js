
const express = require('express')
const { body } = require('express-validator')

const resultController = require('../controllers/result')

const router = express.Router()

router.get('/results', resultController.getAllResults)

router.post('/result', [
    body('jackpot')
        // .matches(/^[0-9]{6}$/)
        .not().isNumeric()
        .withMessage("numbers only")
    // .custom((value, { req }) => {
    //     if (value.winningValues.length !== 1) {
    //         return Promise.reject('wrong amount jackpot')
    //     }
    // })

    , body('firstPrizes')
        // .matches(/^[0-9,]{6}$/)
        .not().isNumeric()
        .withMessage("numbers only")
    // .custom((value, { req }) => {
    //     if (value.winningValues.length !== 1) {
    //         return Promise.reject('wrong amount firstPrizes')
    //     }

    //     value.winningValues.forEach(value => {
    //         console.log(value, 111)
    //         if (value.length < 6) {
    //             return Promise.reject('wrong amount value in tickets of firstPrizes')
    //         }
    //     })
    // })
    , body('secondPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('thirdPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('fourthPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('fifthPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
], resultController.postResult)


router.patch('/result/:resultId', [
    body('jackpot')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('firstPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('secondPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('thirdPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('fourthPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
    , body('fifthPrizes')
        .not().isNumeric()
        .withMessage("numbers only")
], resultController.patchResult)

module.exports = router


/** regex
 * https://itnext.io/understanding-regex-in-javascript-the-easy-way-ad0e5888a3ec
 * https://regex101.com/r/u8xcBx/2
 * 
 * note
 * \d eq [0-9]
 */