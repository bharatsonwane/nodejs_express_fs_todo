const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')
const authHelper = require("../helper/functions/authHelper")

module.exports = class Task {
    constructor(userInfo, reqObj) {
        this.createdBy = userInfo.userId;
        this.createdOn = reqObj && reqObj.createdOn ? reqObj.createdOn : new Date().toISOString();
        this.modifiedOn = "";
        this.divisionName = userInfo.divisionName;
        this.userId = reqObj.userId
        this.userRole = reqObj.userRole;
        this.userActivationStatus = null;
        this.forename = reqObj.forename;
        this.surname = reqObj.surname;
        this.marriedStatus = reqObj.marriedStatus;
        this.phoneNumber = reqObj.phoneNumber;
        this.email = reqObj.email;
        this.dob = reqObj.dob;
        this.gender = reqObj.gender;
        this.programmingLanguageKnown = reqObj.programmingLanguageKnown;
        this.address = reqObj.address;
        this.password = reqObj.password;
    }



    async createEmployee() {
        this.userId = uniqueId.getuserId();
        this.userActivationStatus = "activate";
        // // store that in a database or in a file
        const data = fsHelper.authEmployeeExtractFileData(); // read file data

        let hashedPassword = await authHelper.hashPassword(this.password);
        this.password = hashedPassword
        data.push(this);
        fsHelper.authEmployeeWriteFileData(data); // write file data
        return this // return created Object
    }

    static retrieveEmployeeList(userInfo) {
        const { divisionName, userRole, userId } = userInfo
        const data = fsHelper.authEmployeeExtractFileData(); // read file data

        let filteredEmployeeList = data.filter(employee => {
            if (userRole === "owner") {
                return true;
            } else if (userRole === "manager") {
                if (employee.divisionName === divisionName && employee.userRole === "developer" || employee.userRole === "tester") {
                    return true;
                }
            }
            return false;
        })

        return filteredEmployeeList
    }

    static retrieveEmployeebyId(reqId) {
        const data = fsHelper.authEmployeeExtractFileData(); // read file data

        const employee = data.find(employee => {
            return employee.userId === reqId
        });
        return employee
    }

    static updateUserActivationStatus(reqObj) {
        const data = fsHelper.authEmployeeExtractFileData(); // read file data

        if (reqObj.userId && reqObj.userActivationStatus) {
            let isUserAvalable = false
            let newDataList = data.map((item) => {
                if (item.userId === reqObj.userId) {
                    item.userActivationStatus = reqObj.userActivationStatus;
                    isUserAvalable = true
                    return item;
                } else {
                    return item;
                }
            })
            if (isUserAvalable === false) {
                throw { message: "User is not available" }
            }
            fsHelper.authEmployeeWriteFileData(newDataList); // write file data
            return reqObj // return created Object
        }
        else {
            throw { message: "User Role Should be manager." }
        }
    }

    static deleteEmployee(reqId) {
        const data = fsHelper.authEmployeeExtractFileData(); // read file data

        let filteredEmployee = data.filter(employee => employee.userId !== reqId)
        fs.writeFileSync(filePath, JSON.stringify(filteredEmployee));
    }

    // static retrieveTaskbyId(reqId) {
    //     const data = fsHelper.authEmployeeExtractFileData(); // read file data
    //     const task = data.find(task => task.id === reqId);
    //     return task
    // }
};
