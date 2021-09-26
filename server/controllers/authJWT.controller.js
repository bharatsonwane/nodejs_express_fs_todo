const authUser = require('../models/authJWT.model');


exports.postOwnerLogin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        let user = await authUser.ownerLogin(email, password)
        await res.status(200).send({ token: user, role: "owner" });
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}

exports.postManagerRegister = async (req, res, next) => {
    const { email, forename, dob, password } = req.body
    let reqObj = { email, forename, dob, password }
    try {
        const authUserObject = new authUser(reqObj)
        const registeredUser = await authUserObject.managerRegister()
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
    const { email, password } = req.body
    try {
        let user = await authUser.userLogin(email, password)
        await res.status(200).send({ token: user });
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}

// exports.putResetPassword = async (req, res, next) => {
//     const { userId, email, forename, dob, password } = req.body
//     try {
//         const authObject = new authUser(userId, email, forename, dob, password)
//         const updatedTaskData = await authObject.resetPassword()
//         await res.status(200).send(updatedTaskData);
//     } catch (error) {
//         res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
//     }
// };


