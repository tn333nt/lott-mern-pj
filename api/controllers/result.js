
const { validationResult } = require('express-validator')

const Result = require('../models/result')

exports.getAllResults = async (req, res, next) => {
    const search = req.query.search
    const currentPage = req.query.page || 1
    const perPage = 9

    try {
        const sortedResults = await Result.find().sort({ date: 'desc' })

        const paginatedResults = await Result.find()
            .sort({ date: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        const searchedResults = search && sortedResults.filter(result => {
            if (search !== '') {
                const date = result.date.includes(search.trim())
                const game = result.game.includes(search.trim())
                return date || game
            } else {
                return null
            }
        })

        res.status(200).json({
            results: sortedResults,
            searchedResults: searchedResults,
            paginatedResults: paginatedResults
        })

    } catch (err) {
        next(err);
    }

}

exports.postResult = async (req, res, next) => {

    console.log(req)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(`validation failed at ${error.param} : ${error.msg}`)
        err.statusCode = 422
        throw err
    }

    const date = new Date()
    const today = date.toLocaleDateString("vi-VN")
    const todayResult = await Result.findOne({ date: today })
    if (todayResult) {
        const err = new Error("already have report for today")
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

    const currentPage = req.query.page
    const perPage = 9

    console.log(jackpot, 'jackpot');
    console.log(firstPrizes, 'firstPrizes');

    try {

        const result = new Result({
            date: today,
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

        await result.save()

        const updatedResults = await Result.find().sort({ date: 'desc' })

        const paginatedResults = await Result.find()
            .sort({ date: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            results: updatedResults,
            paginatedResults: paginatedResults
        })

        console.log('posted')

    } catch (err) {
        next(err)
    }

}

exports.patchResult = async (req, res, next) => {
    const resultId = req.params.resultId

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(`validation failed at ${error.param} : ${error.msg}`)
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

    const currentPage = req.query.page
    const perPage = 9

    try {
        const updatingResult = await Result.findById(resultId)

        if (!updatingResult) {
            const err = new Error('No result found to update')
            err.statusCode = 404
            throw err
        }

        updatingResult.jackpot = jackpot
        updatingResult.firstPrizes = firstPrizes
        updatingResult.secondPrizes = secondPrizes
        updatingResult.thirdPrizes = thirdPrizes
        updatingResult.fourthPrizes = fourthPrizes
        updatingResult.fifthPrizes = fifthPrizes
        updatingResult.sixthPrizes = sixthPrizes
        updatingResult.seventhPrizes = seventhPrizes
        updatingResult.eighthPrizes = eighthPrizes

        await updatingResult.save()

        const updatedResults = await Result.find().sort({ date: 'desc' })

        const paginatedResults = await Result.find()
            .sort({ date: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            results: updatedResults,
            paginatedResults: paginatedResults
        })

        console.log('updated')

    } catch (err) {
        next(err)
    }

}
