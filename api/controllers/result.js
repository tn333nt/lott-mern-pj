
const { validationResult } = require('express-validator')

const Result = require('../models/result')

exports.getResults = (req, res, next) => {
    Result.find()
        .then(results => {
            res.status(200).json({ results: results })
        })
        .catch(err => next(err))
}

exports.postResult = (req, res, next) => {
    const jackpot = req.body.jackpot
    const firstPrizes = req.body.firstPrizes
    const secondPrizes = req.body.secondPrizes
    const thirdPrizes = req.body.thirdPrizes
    const fourthPrizes = req.body.fourthPrizes
    const fifthPrizes = req.body.fifthPrizes
    const sixthPrizes = req.body.sixthPrizes
    const seventhPrizes = req.body.seventhPrizes
    const eighthPrizes = req.body.eighthPrizes

    const date = new Date()

    const result = new Result({
        date: date.toISOString(),
        game: 'abc',
        jackpot: jackpot,
        firstPrizes: firstPrizes,
        secondPrizes: secondPrizes,
        thirdPrizes: thirdPrizes,
        fourthPrizes: fourthPrizes,
        fifthPrizes: fifthPrizes,
        sixthPrizes: sixthPrizes,
        seventhPrizes: seventhPrizes,
        eighthPrizes: eighthPrizes,
    })

    result.save()
    .then(resultData => {
        res.status(201).json({
            result: resultData
        })
    })
    .catch(err => next(err))

}

exports.patchResult = (req, res, next) => {
    const resultId = req.params.resultId

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('validation failed')
        err.statusCode = 422
        throw err
    }

    const jackpot = req.body.jackpot
    const firstPrizes = req.body.firstPrizes
    const secondPrizes = req.body.secondPrizes
    const thirdPrizes = req.body.thirdPrizes
    const fourthPrizes = req.body.fourthPrizes
    const fifthPrizes = req.body.fifthPrizes
    const sixthPrizes = req.body.sixthPrizes
    const seventhPrizes = req.body.seventhPrizes
    const eighthPrizes = req.body.eighthPrizes


    Result.findById(resultId)
        .then(result => {
            if (!result) {
                const err = new Error('No result found')
                err.statusCode = 404
                throw err
            }

            result.jackpot = jackpot
            result.firstPrizes = firstPrizes
            result.secondPrizes = secondPrizes
            result.thirdPrizes = thirdPrizes
            result.fourthPrizes = fourthPrizes
            result.fifthPrizes = fifthPrizes
            result.sixthPrizes = sixthPrizes
            result.seventhPrizes = seventhPrizes
            result.eighthPrizes = eighthPrizes

            return result.save()
        })
        .then(updatedResult => {
            res.status(200).json({ result: updatedResult })
        })
        .catch(err => next(err))
}

exports.deleteResult = (req, res, next) => {
    const resultId = req.params.resultId

    Result.findById(resultId)
        .then(result => {
            if (!result) {
                const err = new Error('No result found')
                err.statusCode = 404
                throw err
            }

            console.log('deleted')
            return Result.findByIdAndRemove(resultId)
        })
        .catch(err => next(err))
}