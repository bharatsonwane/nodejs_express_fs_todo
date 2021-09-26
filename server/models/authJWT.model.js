const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')
const authHelper = require("../helper/functions/authHelper")

module.exports = class Auth {
    constructor(reqObj) {
        this.createdBy = null;
        this.createdOn = null;
        this.modifiedBy = null;
        this.modifiedOn = null;
        this.userId = reqObj.userId;
        this.userRole = null
        this.userActivationStatus = null;
        this.forename = reqObj.forename;
        this.surname = null;
        this.marriedStatus = null;
        this.phoneNumber = null;
        this.email = reqObj.email;
        this.dob = reqObj.dob;
        this.gender = null;
        this.programmingLanguageKnown = [];
        this.address = null;
        this.password = reqObj.password;
    }


    async managerRegister() {
        this.userId = uniqueId.getuserId();
        this.userActivationStatus = "pending";
        this.userRole = "manager";
        // store that in a database or in a file
        let filePath = fsHelper.authEmployeeDataFilePath();
        let data = fsHelper.extractFileData(filePath);
        console.log("this", this)
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
        let filePath = fsHelper.authEmployeeDataFilePath();
        let data = fsHelper.extractFileData(filePath);
        if (this.email) {
            let existingUserIndex = data.findIndex(prod => prod.email === this.email);
            this.userId = newUserList[existingUserIndex].userId // get user Unique Id
            let newUserList = [...data];// data ==> users list
            newUserList[existingUserIndex] = this;
            fs.writeFileSync(filePath, JSON.stringify(newUserList));
            return this // return created Object
        }
    }

    static async userLogin(email, password) {
        let filePath = fsHelper.authEmployeeDataFilePath();
        let data = fsHelper.extractFileData(filePath);
        let user = data.find(user => user.email === email)
        if (user) {
            if (user.userRole === "manager" && user.userActivationStatus !== "activate") {
                throw { statusCode: 501, message: "User status pending or deactivated" }
            }
            let isPasswordValid = await authHelper.validatePassword(password, user.password);
            if (isPasswordValid === true) {
                let jwtToken = await authHelper.createToken(user.email, user.userId, user.userRole,)
                return jwtToken
            } else {
                // through error email & password does not match
            }
        } else {
            // through error user does not exists
        }
    }


    static async ownerLogin(email, password) {
        let filePath = fsHelper.authOwnerDataFilePath();
        let data = fsHelper.extractFileData(filePath);
        let user = data.find(user => user.email === email)
        if (user) {
            let isPasswordValid = await authHelper.validatePassword(password, user.password);
            if (isPasswordValid === true) {
                let jwtToken = await authHelper.createToken(user.email, user.userId, "owner")
                return jwtToken
            } else {
                // through error email & password does not match
            }
        } else {
            // through error user does not exists
        }
    }
};
