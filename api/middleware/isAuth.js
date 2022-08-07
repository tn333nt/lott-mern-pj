const jwt = require('jsonwebtoken')

// validate icm tokens
module.exports = (req, res, next) => {
    const token = req.get('Authorization') 
    if (!token) {
        const err = new Error('Invalid authorization header')
        err.statusCode = 401
        throw err
    }
    // pass qua body thi bi complex phan passing props
    // hinh nhu 'Bearer ' dung de avoid case token be null

    const decodedToken = jwt.verify(token, 'privatekey') // decode & verify the token
    // verified => loggedin
    if (!decodedToken) {
        const err = new Error('unable to verify the token')
        err.statusCode = 401
        throw err
    }

    req.user = decodedToken.user

    console.log(req.user)
    next()

}