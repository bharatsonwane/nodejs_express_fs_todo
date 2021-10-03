const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')
const authHelper = require("../helper/functions/authHelper")

module.exports = class Auth {
    constructor(reqObj) {
        this.createdBy = null;
        this.createdOn = reqObj && reqObj.createdOn ? reqObj.createdOn : new Date().toISOString();
        this.modifiedBy = null;
        this.modifiedOn = null;
        this.divisionName = reqObj.divisionName;
        this.userId = reqObj.userId;
        this.userRole = null
        this.userActivationStatus = null;
        this.forename = reqObj.forename;
        this.surname = reqObj.surname;
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

    static async userLogin(reqObj) {
        const ownerData = fsHelper.authOwnerExtractFileData(); // read file data
        const ownerUser = ownerData.find(user => user.email === reqObj.email)
        if (ownerUser) {
            let isPasswordValid = await authHelper.validatePassword(reqObj.password, ownerUser.password);
            if (isPasswordValid === true) {
                let jwtToken = await authHelper.createToken("all", "owner", ownerUser.userId, ownerUser.email,)
                let resObj = { token: jwtToken, userRole: "owner" }
                return resObj;
            } else {
                throw { statusCode: 400, message: "email & password does not match" }
            }
        } else {
            const data = fsHelper.authEmployeeExtractFileData(); // read file data
            let user = data.find(user => user.email === reqObj.email)
            if (user) {
                if (user.userRole === "manager" && user.userActivationStatus !== "activate") {
                    throw { statusCode: 501, message: "User status pending or deactivated" }
                }
                let isPasswordValid = await authHelper.validatePassword(reqObj.password, user.password);

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
    }


    static async retrieveUserProfie(userInfo) {
        let user
        if (userInfo.userRole === "owner") {
            const data = fsHelper.authOwnerExtractFileData(); // read file data
            user = data.find(user => user.email === userInfo.userEmail)

        } else {
            const data = fsHelper.authEmployeeExtractFileData(); // read file data
            user = data.find(user => user.email === userInfo.userEmail)
        }

        if (user) {
            let newUserObj = {}
            Object.entries(user).map(([objectKey, objectValue]) => {
                if (objectKey !== "password") {
                    newUserObj[objectKey] = objectValue
                }
            })
            return newUserObj
        } else {
            throw { statusCode: 400, message: "user does not exists" }
        }
    }
};
