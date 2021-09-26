var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const err = new Error("Something went wrong while authenticating the user.");
    try {
        const token = req.header('Authorization').replace("bearer ", "")
        const decoded = jwt.verify(token, 'secretKey')
        try {
            let userInfo = {
                user: decoded.data.user,
                userId: decoded.data.userId,
                userRole: decoded.data.userRole,
            }
            req.userInfo = userInfo
        } catch (error) {
            err.statusCode = 501
            err.message = "Something went wrong while accessing user information."
            throw err
        }
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = auth