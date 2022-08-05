
const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.getAllUsers = async (req, res, next) => {
    const search = req.query.search
    const currentPage = req.query.page || 1
    const perPage = 9

    try {
        const users = await User.find()

        const paginatedUsers = await User.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        const searchedUsers = search && users.filter(user => {
            if (search !== '') {
                const username = user.username.includes(search.trim())
                const mobile = user.mobile.includes(search.trim())
                return username || mobile
            } else {
                return null
            }
        })

        res.status(200).json({
            users: users,
            searchedUsers: searchedUsers,
            paginatedUsers: paginatedUsers
        })

    } catch (err) {
        next(err);
    }

}

exports.postUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(`validation failed at ${error.param} : ${error.msg}`)
        err.statusCode = 422
        throw err
    }

    if (todayResult) {
        const err = new Error("already have report for today")
        err.statusCode = 422
        throw err
    }

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const mobile = req.body.mobile

    const currentPage = req.query.page
    const perPage = 9

    try {

        const user = new User({
            username: username,
            email: email,
            password: password,
            mobile: mobile
        })

        await user.save()

        const updatedUsers = await User.find()

        const paginatedUsers = await User.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            users: updatedUsers,
            paginatedUsers: paginatedUsers
        })

    } catch (err) {
        next(err)
    }

}

exports.patchUser = async (req, res, next) => {
    const userId = req.params.userId

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(`validation failed at ${error.param} : ${error.msg}`)
        err.statusCode = 422
        throw err
    }

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const mobile = req.body.mobile

    const currentPage = req.query.page
    const perPage = 9

    try {
        const updatingUser = await User.findById(userId)

        if (!updatingUser) {
            const err = new Error('No user found to update')
            err.statusCode = 404
            throw err
        }

        updatingUser.username = username
        updatingUser.email = email
        updatingUser.password = password
        updatingUser.mobile = mobile

        await updatingUser.save()

        const updatedUsers = await User.find()

        const paginatedUsers = await User.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            users: updatedUsers,
            paginatedUsers: paginatedUsers
        })

    } catch (err) {
        next(err)
    }

}

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId
    const currentPage = req.query.page
    const perPage = 9

    try {
        const deletingResult = User.findById(userId)

        if (!deletingResult) {
            const err = new Error('No user found to delete')
            err.statusCode = 404
            throw err
        }

        await User.findByIdAndRemove(userId)

        const updatedUsers = await User.find()

        const paginatedUsers = await User.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        res.status(200).json({
            users: updatedUsers,
            paginatedUsers: paginatedUsers
        })

    } catch (err) {
        next(err)
    }

}


exports.deleteAllUsers = async (req, res, next) => {
    try {
        await User.deleteMany({})
    } catch (err) {
        next(err)
    }
}
