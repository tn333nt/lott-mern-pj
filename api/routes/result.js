
const express = require('express')
const { body } = require('express-validator')

const resultController = require('../controllers/result')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/results', resultController.getAllResults)

router.post('/result', isAuth, isAdmin, resultController.postResult)

router.patch('/result/:resultId', isAuth, isAdmin, resultController.patchResult)

module.exports = router


/** regex
 * https://itnext.io/understanding-regex-in-javascript-the-easy-way-ad0e5888a3ec
 * https://regex101.com/r/u8xcBx/2
 */