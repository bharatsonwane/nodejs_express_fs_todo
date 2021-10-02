const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')
const authHelper = require("../helper/functions/authHelper")

module.exports = class Auth {
    constructor(reqObj) {
        this.createdBy = null;
        this.createdOn = null;
        this.modifiedBy = null;
        this.modifiedOn = null;
        this.divisionName = reqObj.divisionName;
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
        const data = fsHelper.authEmployeeExtractFileData(); // read file data
        let user = data.find(user => user.email === this.email)
        if (user) {
            // through error user is allready exists
        }
        else {
            let hashedPassword = await authHelper.hashPassword(this.password);
            this.password = hashedPassword
            data.push(this);
            fsHelper.authEmployeeWriteFileData(data); // write file data
            return this.email // return created Object
        }
    }

    async updateUser() {
        const data = fsHelper.authEmployeeExtractFileData() // read file data
        if (this.email) {
            let existingUserIndex = data.findIndex(prod => prod.email === this.email);
            this.userId = newUserList[existingUserIndex].userId // get user Unique Id
            let newUserList = [...data];// data ==> users list
            newUserList[existingUserIndex] = this;
            fsHelper.authEmployeeWriteFileData(newUserList); // write file data
            return this // return created Object
        }
    }

    static async userLogin(email, password) {
        const data = fsHelper.authEmployeeExtractFileData(); // read file data

        let user = data.find(user => user.email === email)
        if (user) {
            if (user.userRole === "manager" && user.userActivationStatus !== "activate") {
                throw { statusCode: 501, message: "User status pending or deactivated" }
            }
            let isPasswordValid = await authHelper.validatePassword(password, user.password);


            if (isPasswordValid === true) {
                let jwtToken = await authHelper.createToken(user.divisionName, user.userRole, user.userId, user.email,)
                let resObj = { token: jwtToken, divisionName: user.divisionName, userRole: user.userRole }
                return resObj
            } else {
                throw { statusCode: 501, message: "email & password does not match" }
            }
        } else {
            throw { statusCode: 501, message: "user does not exists" }
        }
    }


    static async ownerLogin(email, password) {
        const data = fsHelper.authOwnerExtractFileData(); // read file data

        let user = data.find(user => user.email === email)
        if (user) {
            let isPasswordValid = await authHelper.validatePassword(password, user.password);
            if (isPasswordValid === true) {
                let jwtToken = await authHelper.createToken("all", "owner", user.userId, user.email,)
                return jwtToken
            } else {
                throw { statusCode: 400, message: "email & password does not match" }
            }
        } else {
            throw { statusCode: 400, message: "user does not exists" }
        }
    }



    static async userProfile(userInfo) {
        const data = fsHelper.authEmployeeExtractFileData(); // read file data
        let user = data.find(user => user.email === email)
    }
};
