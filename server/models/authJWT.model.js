const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')
const authHelper = require("../helper/functions/authHelper")

module.exports = class Auth {
    constructor(userUniqueId, email, fullName, dob, password) {
        this.userUniqueId = userUniqueId;
        this.email = email;
        this.fullName = fullName;
        this.dob = dob;
        this.password = password;
    }


    async registerUser() {
        this.userUniqueId = uniqueId.getUserUniqueId();
        // store that in a database or in a file
        let filePath = fsHelper.authUserPath();
        let data = fsHelper.extractFileData(filePath);
        let user = data.find(user => user.email === this.email)
        if (user) {
            // through error user is allready exists
        }
        else {
            let hashedPassword = await authHelper.hashPassword(this.password);
            this.password = hashedPassword
            data.push(this);
            fs.writeFileSync(filePath, JSON.stringify(data));
            return this.email // return created Object
        }
    }

    async updateUser() {
        let filePath = fsHelper.authUserPath();
        let data = fsHelper.extractFileData(filePath);
        if (this.email) {
            let existingUserIndex = data.findIndex(prod => prod.email === this.email);
            this.userUniqueId = newUserList[existingUserIndex].userUniqueId // get user Unique Id
            let newUserList = [...data];// data ==> users list
            newUserList[existingUserIndex] = this;
            fs.writeFileSync(filePath, JSON.stringify(newUserList));
            return this // return created Object
        }
    }

    static async UserLogin(email, password) {
        let filePath = fsHelper.authUserPath();
        let data = fsHelper.extractFileData(filePath);
        let user = data.find(user => user.email === email)
        if (user) {
            let isPasswordValid = await authHelper.validatePassword(password, user.password);
            if (isPasswordValid === true) {
                let jwtToken = await authHelper.createToken(user.email)
                return jwtToken
            } else {
                // through error email & password does not match
            }
        } else {
            // through error user does not exists
        }
    }
};
