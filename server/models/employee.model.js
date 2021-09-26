const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')

module.exports = class Task {
    constructor(userInfo, reqObj) {
        this.createdBy = userInfo.userId;
        this.createdOn = reqObj && reqObj.createdOn ? reqObj.createdOn : new Date().toISOString();
        this.modifiedOn = "";
        this.userId = reqObj.userId
        this.forename = reqObj.forename;
        this.surname = reqObj.surname;
        this.marriedStatus = reqObj.marriedStatus;
        this.phoneNumber = reqObj.phoneNumber;
        this.email = reqObj.email;
        this.dob = reqObj.dob;
        this.gender = reqObj.gender;
        this.userRole = reqObj.userRole;
        this.programmingLanguageKnown = reqObj.programmingLanguageKnown;
        this.address = reqObj.address;
        this.password = reqObj.password;
    }



    createEmployee() {
        this.userId = uniqueId.getuserId();
        // // store that in a database or in a file
        const filePath = fsHelper.authEmployeeDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        data.push(this);
        fs.writeFileSync(filePath, JSON.stringify(data));
        return this // return created Object
    }

    static retrieveEmployeeList(userInfo) {
        const { userId, userRole } = userInfo
        const filePath = fsHelper.authEmployeeDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        let filteredEmployeeList = data.filter(employee => {
            if (userRole === "owner") {
                return true;
            } else if (userRole === "manager") {
                if (employee.createdBy === userId && employee.userRole === "developer" || employee.userRole === "tester") {
                    return true;
                }
            }
            return false;
        })

        return filteredEmployeeList
    }

    static retrieveEmployeebyId(reqId) {
        const filePath = fsHelper.authEmployeeDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        const employee = data.find(employee => {
            console.log("emp", employee)
            return employee.userId === reqId
        });
        console.log("employee", employee, reqId)
        return employee
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
                throw { message: "User is not available" }
            }
            fs.writeFileSync(filePath, JSON.stringify(newDataList));
            return reqObj // return created Object
        }
        else {
            throw { message: "User Role Should be manager." }
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
