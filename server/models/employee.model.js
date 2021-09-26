const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')

module.exports = class Task {
    constructor(userInfo, reqObj) {
        this.createdBy = userInfo.userId;
        this.createdOn = reqObj && reqObj.createdOn ? reqObj.createdOn : new Date().toISOString();
        this.modifiedOn = "";
        this.id = reqObj.id
        this.forename = reqObj.forename;
        this.surname = reqObj.surname;
        this.marriedStatus = reqObj.marriedStatus;
        this.phoneNumber = reqObj.phoneNumber;
        this.email = reqObj.email;
        this.dob = reqObj.dob;
        this.gender = reqObj.gender;
        this.employeeRole = reqObj.employeeRole;
        this.programmingLanguageKnown = reqObj.programmingLanguageKnown;
        this.address = reqObj.address;
        this.password = reqObj.password;
        this.confirmPassword = reqObj.confirmPassword;
    }



    createEmployee() {
        console.log("this1", this)
        this.id = uniqueId.getuserId();
        // // store that in a database or in a file
        const filePath = fsHelper.authEmployeeDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        data.push(this);
        fs.writeFileSync(filePath, JSON.stringify(data));
        return this // return created Object
    }

    static retrieveAllEmployee() {
        const filePath = fsHelper.authEmployeeDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        return data
    }

    static updateUserActivationStatus(reqObj) {
        const filePath = fsHelper.authEmployeeDataFilePath();
        const data = fsHelper.extractFileData(filePath)
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
                throw "User is not available"
            }
            fs.writeFileSync(filePath, JSON.stringify(newDataList));
            return reqObj // return created Object
        }
        else {
            throw "User Role Should be manager."
        }
    }
    // updateTask() {
    //     const filePath = fsHelper.todoTaskDataFilePath();
    //     const data = fsHelper.extractFileData(filePath);
    //     if (this.id) {
    //         const existingTaskIndex = data.findIndex(prod => prod.id === this.id);
    //         const newTaskList = [...data];// data ==> task list
    //         newTaskList[existingTaskIndex] = this;
    //         fs.writeFileSync(filePath, JSON.stringify(newTaskList));
    //         return this // return created Object
    //     }
    // }

    static deleteEmployee(reqId) {
        const filePath = fsHelper.authEmployeeDataFilePath();
        const data = fsHelper.extractFileData(filePath)
        let filteredEmployee = data.filter(employee => employee.userId !== reqId)
        fs.writeFileSync(filePath, JSON.stringify(filteredEmployee));
    }

    // static retrieveTaskbyId(reqId) {
    //     const filePath = fsHelper.todoTaskDataFilePath();
    //     const data = fsHelper.extractFileData(filePath);
    //     const task = data.find(task => task.id === reqId);
    //     return task
    // }
};
