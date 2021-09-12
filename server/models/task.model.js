const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')

module.exports = class Task {
    constructor(id, title, date, description, technology, library) {
        this.id = id;
        this.title = title
        this.date = date;
        this.description = description;
        this.technology = technology;
        this.library = library;
    }


    createTask() {
        this.id = uniqueId.getRandomAlphanumeric(5);
        // store that in a database or in a file
        const filePath = fsHelper.todoTaskPath();
        const data = fsHelper.extractFileData(filePath);
        data.push(this);
        fs.writeFileSync(filePath, JSON.stringify(data));
        return this // return created Object
    }

    static retrieveAllTask() {
        const filePath = fsHelper.todoTaskPath();
        const data = fsHelper.extractFileData(filePath);
        return data
    }

    updateTask() {
        const filePath = fsHelper.todoTaskPath();
        const data = fsHelper.extractFileData(filePath);
        if (this.id) {
            const existingTaskIndex = data.findIndex(prod => prod.id === this.id);
            const newTaskList = [...data];// data ==> task list
            newTaskList[existingTaskIndex] = this;
            fs.writeFileSync(filePath, JSON.stringify(newTaskList));
            return this // return created Object
        }
    }

    static deleteTask(reqId) {
        const filePath = fsHelper.todoTaskPath();
        const data = fsHelper.extractFileData(filePath);
        let filteredTask = data.filter(task => task.id !== reqId)
        fs.writeFileSync(filePath, JSON.stringify(filteredTask));
    }

    static retrieveTaskbyId(reqId) {
        const filePath = fsHelper.todoTaskPath();
        const data = fsHelper.extractFileData(filePath);
        const task = data.find(task => task.id === reqId);
        return task
    }
};
