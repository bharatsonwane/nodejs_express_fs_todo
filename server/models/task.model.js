const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')

module.exports = class Task {
    constructor(userInfo, reqObj) {
        this.createdBy = userInfo.userId;
        this.createdOn = reqObj && reqObj.createdOn ? reqObj.createdOn : new Date().toISOString();
        this.modifiedOn = "";
        this.id = reqObj.id;
        this.title = reqObj.title
        this.date = reqObj.date;
        this.description = reqObj.description;
        this.technology = reqObj.technology;
        this.library = reqObj.library;
    }


    createTask() {
        this.id = uniqueId.getTaskUniqueId(5);
        // store that in a database or in a file
        const filePath = fsHelper.todoTaskDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        data.push(this);
        fs.writeFileSync(filePath, JSON.stringify(data));
        return this // return created Object
    }

    static retrieveTaskList(reqObj) {
        const filePath = fsHelper.todoTaskDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        let newData = data.filter(tasks => tasks.createdBy === reqObj.userId)
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
};
