
const express = require('express')
const { body } = require('express-validator')

const resultController = require('../controllers/result')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/results', resultController.getAllResults)

router.post('/result', [
    body('jackpot.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Jackpot is required')
        .isLength({ min: 6, max: 6 })
        .withMessage('Jackpot requires 6 digits long')
        .isNumeric()
        .withMessage('Jackpot only contains numbers')

    , body('secondPrizes.winningValues')
        .isArray({ min: 3, max: 3 }) // hardcoded here
        .withMessage('Second prizes require 3 tickets')
    , body('secondPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Second prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('Second prizes only contain number and comma')
        .isLength({ min: 5, max: 5 })
        .withMessage('Second prize requires 5 digits long')

    , body('firstPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('First prizes require 3 tickets')
    , body('firstPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('First prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('First prizes only contain number and comma')
        .isLength({ min: 6, max: 6 })
        .withMessage('First prize requires 6 digits long')

    , body('thirdPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('Third prizes require 3 tickets')
    , body('thirdPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Third prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('Third prizes only contain number and comma')
        .isLength({ min: 4, max: 4 })
        .withMessage('Third prize requires 4 digits long')

    , body('fourthPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('Fourth prizes require 3 tickets')
    , body('fourthPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Fourth prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('Fourth prizes only contain number and comma')
        .isLength({ min: 3, max: 3 })
        .withMessage('Fourth prize requires 3 digits long')

    , body('fifthPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('Fifth prizes require 3 tickets')
    , body('fifthPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Fifth prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('Fifth prizes only contain number and comma')
        .isLength({ min: 2, max: 2 })
        .withMessage('Fifth prize requires 2 digits long')

], isAuth, isAdmin, resultController.postResult)


// https://express-validator.github.io/docs/wildcards.html
router.patch('/result/:resultId', [
    body('jackpot.winningValues.*')
        // value la {[]} het ma:) ko dung nhu bthg dc
        .trim()
        .notEmpty()
        .withMessage('Jackpot is required')
        .isLength({ min: 6, max: 6 })
        .withMessage('Jackpot requires 6 digits long')
        .isNumeric()
        .withMessage('Jackpot only contains numbers')
    // .custom((value, { req }) => {
    //     // const value = value.winningValues
    //     // // if (value.length !== 1) {
    //     // if (value[0].length !== 6) {
    //     //     throw new Error('6 numbers required')
    //     // }
    //     console.log(value, 'value')
    // })


    , body('secondPrizes.winningValues')
        // .isLength({ min: 3, max: 3 })
        .isArray({ min: 3, max: 3 }) // https://express-validator.github.io/docs/validation-chain-api.html#isarrayoptions
        .withMessage('Second prizes require 3 tickets')
    // .custom((value, { req }) => {
    //     console.log(value.length, 2645725311111)
    //     // 3 => why still wrong ?
    // })
    , body('secondPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Second prizes is required')
        .matches(/^[0-9,]*$/) // equivalent to regex.test()
        .withMessage('Second prizes only contain number and comma')
        .isLength({ min: 5, max: 5 })
        .withMessage('Second prize requires 5 digits long')

    , body('firstPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('First prizes require 3 tickets')
    , body('firstPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('First prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('First prizes only contain number and comma')
        .isLength({ min: 6, max: 6 })
        .withMessage('First prize requires 6 digits long')

    , body('thirdPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('Third prizes require 3 tickets')
    , body('thirdPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Third prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('Third prizes only contain number and comma')
        .isLength({ min: 4, max: 4 })
        .withMessage('Third prize requires 4 digits long')

    , body('fourthPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('Fourth prizes require 3 tickets')
    , body('fourthPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Fourth prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('Fourth prizes only contain number and comma')
        .isLength({ min: 3, max: 3 })
        .withMessage('Fourth prize requires 3 digits long')

    , body('fifthPrizes.winningValues')
        .isArray({ min: 3, max: 3 })
        .withMessage('Fifth prizes require 3 tickets')
    , body('fifthPrizes.winningValues.*')
        .trim()
        .notEmpty()
        .withMessage('Fifth prizes is required')
        .matches(/^[0-9,]*$/)
        .withMessage('Fifth prizes only contain number and comma')
        .isLength({ min: 2, max: 2 })
        .withMessage('Fifth prize requires 2 digits long')


], isAuth, isAdmin, resultController.patchResult)

module.exports = router


/** regex
 * https://itnext.io/understanding-regex-in-javascript-the-easy-way-ad0e5888a3ec
 * https://regex101.com/r/u8xcBx/2
 */