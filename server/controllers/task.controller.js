const todoTask = require('../models/task.model');


exports.postCreateTask = async (req, res, next) => {
    try {
        let userInfo = req.userInfo
        const { title, date, description, technology, library } = req.body
        reqObj = { title, date, description, technology, library }
        const taskObject = new todoTask(userInfo, reqObj)
        const resObj = await taskObject.createTask()
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};


exports.getRetrieveTaskList = async (req, res, next) => {
    try {
        let userInfo = req.userInfo
        const resObj = await todoTask.retrieveTaskList(userInfo)
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};


exports.putUpdateTask = async (req, res, next) => {
    const { id, title, date, description, technology, library } = req.body
    try {
        const taskObject = new todoTask(id, title, date, description, technology, library)
        const resObj = await taskObject.updateTask()
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};


exports.deleteDeleteTask = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let resObj = await todoTask.deleteTask(reqId)
        await res.status(200).send({ id: resObj, message: "task deleted succesfully" });
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}


exports.getRetrieveTaskById = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let resObj = await todoTask.retrieveTaskbyId(reqId)
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}


exports.putUpdateTaskCompleteStatus = async (req, res, next) => {
    let userInfo = req.userInfo
    let reqObj = req.body
    try {
        let resobj = await todoTask.updateTaskCompleteStatus(userInfo, reqObj)
        await res.status(200).send(resobj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}


exports.putUpdateTaskTestingReport = async (req, res, next) => {
    let userInfo = req.userInfo
    let reqObj = req.body
    try {
        let resObj = await todoTask.updateTaskTestingReport(userInfo, reqObj)
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}