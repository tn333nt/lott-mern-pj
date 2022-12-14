const bcrypt = require('bcryptjs')
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
                const email = user.email.includes(search.trim())
                return email
            } else {
                const err = new Error('Not found user')
                err.statusCode = 404
                next(err)
            }
        })

        res.status(200).json({
            users: users,
            searchedUsers: searchedUsers,
            paginatedUsers: paginatedUsers
        })

    } catch (err) {
        err.message = 'Failed to fetch users'
        next(err);
    }

}

exports.setAdmin = async (req, res, next) => {
    const userId = req.params.userId

    const isAdmin = req.body.isAdmin

    const currentPage = req.query.page
    const perPage = 9

    try {
        const updatingUser = await User.findById(userId)
        if (!updatingUser) {
            const err = new Error('Not found user to update')
            err.statusCode = 404
            throw err
        }

        updatingUser.isAdmin = isAdmin
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
        err.message = 'Failed to fetch user to update'
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
        err.message = 'Failed to fetch user to delete'
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

// personal

exports.changePassword = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }

    const userId = req.user._id
    const { oldPassword, newPassword, confirmPassword } = req.body

    try {
        const user = await User.findById(userId)
        if (!user) {
            const err = new Error('Not authenticated you')
            err.statusCode = 401
            throw err
        }

        // compare old pw with data in db
        const isValid = await bcrypt.compare(oldPassword, user.password) || oldPassword === 'unhasedPassForTempData'
        if (!isValid) {
            const err = new Error('Wrong password')
            err.statusCode = 401
            throw err
        }

        // compare new pw with confirm
        const isMatched = newPassword === confirmPassword
        if (!isMatched) {
            const err = new Error('Passwords did not match')
            err.statusCode = 422
            throw err
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedPassword
        await user.save()

        res.status(201).json({ user: user })

    } catch (err) {
        next(err)
    }
}


exports.updateUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        const err = new Error(error.msg)
        err.statusCode = 422
        return next(err)
    }
    // later : pass errors & custom msg for each field (use beV for ffb)

    const userId = req.user._id
    const {
        username, age, fullName,
        country, city, address,
        mobile, postalCode
    } = req.body

    try {
        const user = await User.findById(userId)
        if (!user) {
            const err = new Error('Not authenticated you')
            err.statusCode = 401
            throw err
        }

        user.username = username
        user.age = age && +age
        user.fullName = fullName
        user.mobile = mobile
        user.country = country
        user.city = city
        user.address = address
        user.postalCode = postalCode

        await user.save()

        res.status(200).json({ user: user })

    } catch (err) {
        next(err)
    }
}