var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// // AUTH
const hashPassword = async (password) => {
    let hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}

const validatePassword = async (password, hashedPassword) => {
    let isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
}

const createToken = async (email) => {
    let jwtToken = jwt.sign({ data: { user: email, role: "user" } }, "secretKey", { expiresIn: 24 * 60 * 60 })
    return jwtToken
}

const validateToken = async (token) => {
    try {
        // verify a token symmetric - synchronous
        let decodedToken = jwt.verify(token, 'secretKey');
        console.log("decodedToken", decodedToken)
    } catch (error) {

    }
}

module.exports = {
    hashPassword,
    validatePassword,
    createToken,
    validateToken,
}