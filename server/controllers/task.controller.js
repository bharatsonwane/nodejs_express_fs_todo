const todoTask = require('../models/task.model');


exports.postCreateTask = async (req, res, next) => {
    const { title, date, description, technology, library } = req.body
    reqObj = { title, date, description, technology, library }
    try {
        const taskObject = new todoTask(req.userInfo, reqObj)
        const createdTaskData = await taskObject.createTask()
        await res.status(200).send(createdTaskData);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};


exports.getRetrieveTaskList = async (req, res, next) => {
    try {
        let reqObj = req.userInfo
        const allTaskData = await todoTask.retrieveTaskList(reqObj)
        await res.status(200).send(allTaskData);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};


exports.putUpdateTask = async (req, res, next) => {
    const { id, title, date, description, technology, library } = req.body
    try {
        const taskObject = new todoTask(id, title, date, description, technology, library)
        const updatedTaskData = await taskObject.updateTask()
        await res.status(200).send(updatedTaskData);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};


exports.deleteDeleteTask = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let resId = await todoTask.deleteTask(reqId)
        await res.status(200).send({ id: resId, message: "task deleted succesfully" });
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
}


exports.getRetrieveTaskById = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let task = await todoTask.retrieveTaskbyId(reqId)
        await res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
}