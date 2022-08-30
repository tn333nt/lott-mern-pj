
const { validationResult } = require('express-validator')

const Result = require('../models/result')

exports.getAllResults = async (req, res, next) => {
    const search = req.query.search
    const currentPage = req.query.page || 1
    const perPage = 9

    try {
        // sort results by created date
        const sortedResults = await Result.find().sort({ createdAt: 'desc' })

        // fetch results for each page (limit amount by perPage & skip items of prev pages)
        const paginatedResults = await Result.find()
            .sort({ createdAt: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        // filter results using passed data
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

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }

    const date = new Date()
    const today = date.toLocaleDateString("vi-VN")
    // check if exist result for today
    const todayResult = await Result.findOne({ date: today })
    if (todayResult) {
        const err = new Error("Already have report for today")
        err.statusCode = 409
        return next(err)
    }

    const {
        jackpot, firstPrizes, secondPrizes,
        thirdPrizes, fourthPrizes, fifthPrizes,
        sixthPrizes, seventhPrizes, eighthPrizes
    } = req.body

    const currentPage = req.query.page
    const perPage = 9

    try {

        const result = new Result({
            jackpot, firstPrizes, secondPrizes,
            thirdPrizes, fourthPrizes, fifthPrizes,
            sixthPrizes, seventhPrizes, eighthPrizes,
            // hardcoded here
            date: today,
            game: 'abc',
            prizesAmount: 6,
        })
        await result.save()

        const updatedResults = await Result.find().sort({ createdAt: 'desc' })
        const paginatedResults = await Result.find()
            .sort({ createdAt: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            results: updatedResults,
            paginatedResults: paginatedResults
        })

    } catch (err) {
        next(err)
    }

}

exports.patchResult = async (req, res, next) => {
    const resultId = req.params.resultId

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }

    let {
        jackpot, firstPrizes, secondPrizes,
        thirdPrizes, fourthPrizes, fifthPrizes,
        sixthPrizes, seventhPrizes, eighthPrizes
    } = req.body

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

        const updatedResults = await Result.find().sort({ createdAt: 'desc' })
        const paginatedResults = await Result.find()
            .sort({ createdAt: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            results: updatedResults,
            paginatedResults: paginatedResults
        })

    } catch (err) {
        next(err)
    }

}
