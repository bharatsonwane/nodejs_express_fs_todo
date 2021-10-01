const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')

module.exports = class Task {
    constructor(userInfo, reqObj) {
        this.divisionName = userInfo.divisionName;
        this.createdBy = userInfo.userId;
        this.createdOn = reqObj && reqObj.createdOn ? reqObj.createdOn : new Date().toISOString();
        this.modifiedOn = null;
        this.id = reqObj.id;
        this.status = {
            completion: {
                completedBy: null,
                completedOn: null,
                completionStatus: null // assigned, pending, completed, reopened
            },
            testing: {
                testedBy: null,
                testedOn: null,
                testingStatus: null // passed, failed,
            },
        };
        this.title = reqObj.title
        this.date = reqObj.date;
        this.description = reqObj.description;
        this.technology = reqObj.technology;
        this.library = reqObj.library;
    }


    createTask() {
        this.id = uniqueId.getTaskUniqueId(5);
        this.status.completion.completionStatus = "assigned"
        // store that in a database or in a file
        const filePath = fsHelper.todoTaskDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        data.push(this);
        fs.writeFileSync(filePath, JSON.stringify(data));
        return this // return created Object
    }

    static retrieveTaskList(userInfo) {
        const filePath = fsHelper.todoTaskDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        let newData = data.filter(task => {
            if (userInfo.userRole === "owner") {
                return true;
            }
            else if (task.divisionName === userInfo.divisionName) {
                if (userInfo.userRole === "manager") {
                    return true;
                }
                else if (userInfo.userRole == "developer" && (task.status.completion.completionStatus === "assigned" || task.status.completion.completionStatus === "reopened")) {
                    console.log("userInfo.userRole", userInfo.userRole)
                    return true;
                }
                else if (userInfo.userRole === "tester" && task.status.testing.testingStatus !== "passed" && (task.status.completion.completionStatus === "completed" || task.status.completion.completionStatus !== "reopened")) {
                    console.log("task.status.testing.testingStatus", task.status.testing.testingStatus)
                    return true
                }
            }
            return false
        })
        return newData
    }

    updateTask() {
        const filePath = fsHelper.todoTaskDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        if (this.id) {
            this.modifiedOn = new Date().toISOString()
            const existingTaskIndex = data.findIndex(prod => prod.id === this.id);
            const newTaskList = [...data];// data ==> task list
            newTaskList[existingTaskIndex] = this;
            fs.writeFileSync(filePath, JSON.stringify(newTaskList));
            return this // return created Object
        }
    }

    static deleteTask(reqId) {
        const filePath = fsHelper.todoTaskDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        let filteredTask = data.filter(task => task.id !== reqId)
        fs.writeFileSync(filePath, JSON.stringify(filteredTask));
        return reqId
    }

    static retrieveTaskbyId(reqId) {
        const filePath = fsHelper.todoTaskDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        const task = data.find(task => task.id === reqId);
        return task
    }

    static updateTaskCompleteStatus(userInfo, reqObj) {
        if (userInfo.userRole === "developer") {
            const filePath = fsHelper.todoTaskDataFilePath();
            const data = fsHelper.extractFileData(filePath);
            const newDataArray = data.map((task) => {
                if (task.id === reqObj.id) {
                    let newTask = { ...task }
                    newTask.status.completion.testedBy = userInfo.userId
                    newTask.status.completion.testedOn = new Date().toISOString()
                    newTask.status.completion.completionStatus = "completed"
                    return newTask
                }
                return task
            })
            fs.writeFileSync(filePath, JSON.stringify(newDataArray));
            return { id: reqObj.id, completionStatus: "completed" }
        } else {
            throw { statusCode: 501, message: "Only developer can be update task completion status" }
        }
    }

    static updateTaskTestingReport(userInfo, reqObj) {
        if (userInfo.userRole === "tester") {
            const filePath = fsHelper.todoTaskDataFilePath();
            const data = fsHelper.extractFileData(filePath);
            const newDataArray = data.map((task) => {
                if (task.id === reqObj.id) {
                    let newTask = { ...task }
                    newTask.status.testing.testedBy = userInfo.userId
                    newTask.status.testing.testedOn = new Date().toISOString()
                    if (reqObj.testingStatus === "passed") {
                        newTask.status.testing.testingStatus = "passed"
                    } else if (reqObj.testingStatus === "failed") {
                        newTask.status.completion.completionStatus = "reopened"
                        newTask.status.testing.testingStatus = "failed"
                    }
                    return newTask
                }
                return task
            })
            fs.writeFileSync(filePath, JSON.stringify(newDataArray));
            return { id: reqObj.id }
        } else {
            throw { statusCode: 501, message: "Only tester can be update task completion status" }
        }
    }
};
