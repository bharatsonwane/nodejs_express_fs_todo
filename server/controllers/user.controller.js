const user = require('../models/user.model');


exports.postManagerRegister = async (req, res, next) => {
    try {
        let reqObj = req.body
        const userObject = new user(reqObj)
        const registeredUser = await userObject.managerRegister()
        let response = {
            user: registeredUser,
            message: "Manager Registered Successfully..."
        }
        await res.status(200).send(response);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};

exports.postUserLogin = async (req, res, next) => {
    try {
        let reqObj = req.body
        let resObj = await user.userLogin(reqObj)
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}

exports.getUserProfile = async (req, res, next) => {
    try {
        let userInfo = req.userInfo
        let resObj = await user.retrieveUserProfie(userInfo)
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}

// exports.putResetPassword = async (req, res, next) => {
//     const { userId, email, forename, dob, password } = req.body
//     try {
//         const authObject = new user(userId, email, forename, dob, password)
//         const updatedTaskData = await authObject.resetPassword()
//         await res.status(200).send(updatedTaskData);
//     } catch (error) {
//         res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
//     }
// };


