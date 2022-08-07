
module.exports = (req, res, next) => {
    if (!req.user.isAdmin) {
        const err = new Error('Not authorized');
        err.statusCode = 403;
        throw err;
    }

    next()
}