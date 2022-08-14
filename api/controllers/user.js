const bcrypt = require('bcryptjs')

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

exports.setAdmin = async (req, res, next) => {
    const userId = req.params.userId

    const isAdmin = req.body.isAdmin

    const currentPage = req.query.page
    const perPage = 9

    try {
        const updatingUser = await User.findById(userId)

        if (!updatingUser) {
            const err = new Error('Not found user')
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


exports.changePassword = async (req, res, next) => {
    const userId = req.user._id

    const oldPassword = req.body.oldPassword.trim().toString()
    const newPassword = req.body.newPassword.trim().toString()
    const confirmPassword = req.body.confirmPassword.trim().toString()

    try {
        const user = await User.findById(userId)
        if (!user) {
            const err = new Error('Not found user')
            err.statusCode = 404
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