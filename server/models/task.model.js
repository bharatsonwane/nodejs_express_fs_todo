
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
            statusLog: [],
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


    async createTask() {
        this.id = uniqueId.getTaskUniqueId(5);
        this.status.completion.completionStatus = "assigned"
        // store that in a database or in a file
        const data = fsHelper.todoTaskExtractFileData()
        data.push(this);
        fsHelper.todoTaskWriteFileData(data)
        return this // return created Object
    }

    static async retrieveTaskList(userInfo) {
        const data = fsHelper.todoTaskExtractFileData()
        let newData = data.filter(task => {
            if (userInfo.userRole === "owner") {
                return true;
            }
            else if (task.divisionName === userInfo.divisionName) {
                if (userInfo.userRole === "manager") {
                    return true;
                }
                else if (userInfo.userRole == "developer") {
                    if (task.status.completion.completionStatus === "assigned") {
                        return true;
                    } else if (task.status.completion.completionStatus === "reopened" && task.status.completion.completedBy === userInfo.userId) {
                        return true;
                    }
                }
                else if (userInfo.userRole === "tester" && task.status.completion.completionStatus !== "reopened" && task.status.testing.testingStatus !== "passed") {
                    if (task.status.completion.completionStatus === "completed") {
                        if (task.status.testing.testingStatus === null) {
                            return true
                        } else if (task.status.testing.testingStatus === "failed" && task.status.testing.testedBy === userInfo.userId) {
                            return true
                        }
                    }
                }
            }
            return false
        })
        return newData
    }

    async updateTask() {
        const data = fsHelper.todoTaskExtractFileData()
        if (this.id) {
            this.modifiedOn = new Date().toISOString()
            const existingTaskIndex = data.findIndex(prod => prod.id === this.id);
            const newTaskList = [...data];// data ==> task list
            newTaskList[existingTaskIndex] = this;
            fsHelper.todoTaskWriteFileData(newTaskList)
            return this // return created Object
        }
    }

    static deleteTask(reqId) {
        const data = fsHelper.todoTaskExtractFileData()
        let filteredTask = data.filter(task => task.id !== reqId)
        fsHelper.todoTaskWriteFileData(filteredTask)
        return reqId
    }

    static async retrieveTaskbyId(reqId) {
        const data = fsHelper.todoTaskExtractFileData()
        const task = data.find(task => task.id === reqId);
        return task
    }

    static async updateTaskCompleteStatus(userInfo, reqObj) {
        if (userInfo.userRole === "developer") {
            const data = fsHelper.todoTaskExtractFileData()
            const newDataArray = data.map((task) => {
                if (task.id === reqObj.id) {
                    let newTask = { ...task }
                    let statusLogObj = {
                        completedOn: new Date().toISOString(),
                        completionStatus: "completed"
                    }

                    newTask.status.statusLog.push(statusLogObj)
                    newTask.status.completion.completedBy = userInfo.userId
                    newTask.status.completion.completedOn = new Date().toISOString()
                    newTask.status.completion.completionStatus = "completed"
                    return newTask
                }
                return task
            })
            fsHelper.todoTaskWriteFileData(newDataArray)
            return { id: reqObj.id, completionStatus: "completed" }
        } else {
            throw { statusCode: 501, message: "Only developer can be update task completion status" }
        }
    }

    static async updateTaskTestingReport(userInfo, reqObj) {
        if (userInfo.userRole === "tester") {
            const data = fsHelper.todoTaskExtractFileData()
            const newDataArray = data.map((task) => {
                if (task.id === reqObj.id) {
                    let newTask = { ...task }
                    newTask.status.testing.testedBy = userInfo.userId
                    newTask.status.testing.testedOn = new Date().toISOString()
                    if (reqObj.testingStatus === "passed") {
                        let statusLogObj = {
                            testedOn: new Date().toISOString(),
                            testingStatus: "passed"
                        }
                        newTask.status.statusLog.push(statusLogObj)
                        newTask.status.testing.testingStatus = "passed"
                    } else if (reqObj.testingStatus === "failed") {
                        let statusLogObj = {
                            testedOn: new Date().toISOString(),
                            testingStatus: "failed"
                        }
                        newTask.status.statusLog.push(statusLogObj)
                        newTask.status.completion.completionStatus = "reopened"
                        newTask.status.testing.testingStatus = "failed"
                    }
                    return newTask
                }
                return task
            })
            fsHelper.todoTaskWriteFileData(newDataArray)
            return { id: reqObj.id }
        } else {
            throw { statusCode: 501, message: "Only tester can be update task completion status" }
        }
    }
};
