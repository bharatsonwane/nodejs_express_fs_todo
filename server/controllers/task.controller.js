const todoTask = require('../models/task.model');


exports.postCreateTask = async (req, res, next) => {
    const { title, date, description, technology, library } = req.body
    try {
        const taskObject = new todoTask(null, title, date, description, technology, library)
        const createdTaskData = await taskObject.createTask()
        await res.status(200).send(createdTaskData);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};


exports.getRetrieveAllTask = async (req, res, next) => {
    console.log("req.userInfo", req.userInfo)
    try {
        const allTaskData = await todoTask.retrieveAllTask()
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
        todoTask.deleteTask(reqId)
        await res.status(200).send("task deleted succesfully");
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