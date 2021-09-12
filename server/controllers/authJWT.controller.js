const authUser = require('../models/authJWT.model');



exports.postRegisterUser = async (req, res, next) => {
    const { email, fullName, dob, password } = req.body
    try {
        const authUserObject = new authUser(null, email, fullName, dob, password)
        const registeredUser = await authUserObject.registerUser()
        let response = {
            user: registeredUser,
            message: "User Registered Successfully..."
        }
        await res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};

exports.postUserLogin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        let user = await authUser.UserLogin(email, password)
        await res.status(200).send({ token: user });
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
}

// exports.putResetPassword = async (req, res, next) => {
//     const { userUniqueId, email, fullName, dob, password } = req.body
//     try {
//         const authObject = new authUser(userUniqueId, email, fullName, dob, password)
//         const updatedTaskData = await authObject.resetPassword()
//         await res.status(200).send(updatedTaskData);
//     } catch (error) {
//         res.status(500).send({ error: "Something went Wrong" })
//     }
// };


