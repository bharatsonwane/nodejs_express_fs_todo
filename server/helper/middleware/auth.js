var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("bearer ", "")
        const decoded = jwt.verify(token, 'secretKey')
        try {
            let userInfo = {
                divisionName: decoded.data.divisionName,
                userId: decoded.data.userId,
                userRole: decoded.data.userRole,
                userEmail: decoded.data.userEmail,
            }
            req.userInfo = userInfo
        } catch (error) {
            throw { statusCode: 502, message: "Something went wrong while accessing user information." }
        }
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = auth