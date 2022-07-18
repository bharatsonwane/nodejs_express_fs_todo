
const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')

module.exports = class Task {
    constructor(userInfo, reqObj) {
        this.createdOn = reqObj && reqObj.createdOn ? reqObj.createdOn : new Date().toISOString();
        this.modifiedOn = null;
        this.id = reqObj.id;
        this.title = reqObj.title
        this.date = reqObj.date;
        this.description = reqObj.description;
        this.technology = reqObj.technology;
        this.library = reqObj.library;
    }


    async createProject() {
        this.id = uniqueId.getTaskUniqueId(5);
        // store that in a database or in a file
        const data = fsHelper.projectExtractFileData()
        data.push(this);
        fsHelper.projectWriteFileData(data)
        return this // return created Object
    }

    static async retrieveProjectList() {
        const data = fsHelper.projectExtractFileData()
        return data
    }

    async updateProject() {
        const data = fsHelper.projectExtractFileData()
        if (this.id) {
            this.modifiedOn = new Date().toISOString()
            const existingTaskIndex = data.findIndex(item => item.id === this.id);
            const newTaskList = [...data];// data ==> task list
            newTaskList[existingTaskIndex] = this;
            fsHelper.projectWriteFileData(newTaskList)
            return this // return created Object
        }
    }

    static deleteProject(reqId) {
        const data = fsHelper.projectExtractFileData()
        let filteredTask = data.filter(item => item.id !== reqId)
        fsHelper.projectWriteFileData(filteredTask)
        return reqId
    }

    static async retrieveProjectbyId(reqId) {
        const data = fsHelper.projectExtractFileData()
        const project = data.find(item => item.id === reqId);
        return project
    }
};
