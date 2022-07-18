const project = require('../models/project.model');


exports.postCreateProject = async (req, res, next) => {
    try {
        const { title, date, description, technology, library } = req.body
        const reqObj = { title, date, description, technology, library }
        const projectObject = new project(null, reqObj)
        const resObj = await projectObject.createProject()
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};


exports.getRetrieveProjectList = async (req, res, next) => {
    try {
        const resObj = await project.retrieveProjectList()
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};


exports.putUpdateProject = async (req, res, next) => {
    try {
        const { id, title, date, description, technology, library } = req.body
        const reqObj = { id, title, date, description, technology, library }
        const projectObject = new project(null, reqObj)
        const resObj = await projectObject.updateProject()
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};



exports.deleteDeleteProject = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let resObj = await project.deleteProject(reqId)
        await res.status(200).send({ id: resObj, message: "task deleted succesfully" });
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}



exports.getRetrieveProjectById = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let resObj = await project.retrieveProjectbyId(reqId)
        await res.status(200).send(resObj);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}
