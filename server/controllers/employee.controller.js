const employeeModel = require('../models/employee.model');


exports.getRetrieveEmployeeList = async (req, res, next) => {
    let userInfo = req.userInfo
    try {
        const allTaskData = await employeeModel.retrieveEmployeeList(userInfo)
        await res.status(200).send(allTaskData);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};

exports.getRetrieveEmployeeById = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let employee = await employeeModel.retrieveEmployeebyId(reqId)
        await res.status(200).send(employee);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}


exports.putUpdateUserActivationStatus = async (req, res, next) => {
    const { userId, userActivationStatus } = req.body
    let reqObj = { userId, userActivationStatus }
    try {
        const userActivationResponse = employeeModel.updateUserActivationStatus(reqObj)
        await res.status(200).send(userActivationResponse);
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
};


exports.deleteDeleteEmployee = async (req, res, next) => {
    let reqId = req.params.id
    try {
        let resObj = employeeModel.deleteEmployee(reqId)
        await res.status(200).send({ id: resObj, message: "User deleted succesfully" });
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}


exports.postCreateEmployee = async (req, res, next) => {
    let userInfo = req.userInfo
    let reqObj = req.body
    try {
        const employeeObject = new employeeModel(userInfo, reqObj)
        let resObj = await employeeObject.createEmployee()
        await res.status(200).send({ email: resObj, message: "Employee created succesfully" });
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).send({ error: error.message })
    }
}