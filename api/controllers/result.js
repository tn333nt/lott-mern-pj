
const { validationResult } = require('express-validator')

const Result = require('../models/result')

exports.getAllResults = async (req, res, next) => {
    const search = req.query.search
    const currentPage = req.query.page || 1
    const perPage = 6

    try {
        const sortedResults = await Result.find().sort({ date: 'desc' })

        const paginatedResults = await Result.find()
            .sort({ date: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        const searchedResults = search && sortedResults.filter(result => {
            if (search !== '') {
                const d = new Date(result.date);
                d.setHours(d.getHours() + 7)
                // console.log(d.toLocaleDateString('vi-vn', 'vn'), 'test')
                const date = d.toISOString().includes(search.trim())
                const game = result.game.includes(search.trim())
                return date || game
            } else {
                return null
            }
        })

        // const searchedResults = Result.find({$regex: search})
        // const regex = new RegExp(search, 'i')
        // const searchedResults = Result.find({
        //     $or: [
        //         { date: {$regex: regex} },
        //         { game: {$regex: regex} }
        //     ]
        // })

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

    const currentPage = req.query.page
    const perPage = 6

    try {

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

    const currentPage = req.query.page
    const perPage = 6

    try {
        const updatingResult = await Result.findById(resultId)

        if (!updatingResult) {
            const err = new Error('No result found')
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

exports.deleteResult = async (req, res, next) => {
    const resultId = req.params.resultId
    const currentPage = req.query.page
    const perPage = 6

    try {
        const deletingResult = Result.findById(resultId)

        if (!deletingResult) {
            const err = new Error('No result found')
            err.statusCode = 404
            throw err
        }
        await Result.findByIdAndRemove(resultId)

        const updatedResults = await Result.find().sort({ date: 'desc' })

        const paginatedResults = await Result.find()
            .sort({ date: 'desc' })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            results: updatedResults,
            paginatedResults: paginatedResults
        })

        console.log('deleted')

    } catch (err) {
        next(err)
    }

}


exports.deleteAllResults = async (req, res, next) => {
    try {
        await Result.deleteMany({})
    } catch (err) {
        next(err)
    }
}


exports.deleteManyResults = async (req, res, next) => {
    const Ids = req.body.Ids // pattern : 'id1,id2,...'

    try {
        await Result.deleteMany({ _id: { $in: Ids.split(',') } })
    } catch (err) {
        next(err)
    }
}