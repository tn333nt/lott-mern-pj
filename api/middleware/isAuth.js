const jwt = require('jsonwebtoken')

// validate icm tokens
module.exports = (req, res, next) => {
    const token = req.get('Authorization') 
    if (!token) {
        const err = new Error('Invalid authorization header')
        err.statusCode = 401
        throw err
    }

    const decodedToken = jwt.verify(token, 'privatekey') // decode & verify the token
    if (!decodedToken) {
        const err = new Error('unable to verify the token')
        err.statusCode = 401
        throw err
    }

    req.user = decodedToken.user

    next()

}