const employeeModel = require('../models/employee.model');


exports.getRetrieveAllEmployee = async (req, res, next) => {
    try {
        const allTaskData = await employeeModel.retrieveAllEmployee()
        await res.status(200).send(allTaskData);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};


exports.putUpdateUserActivationStatus = async (req, res, next) => {
    const { userId, userActivationStatus } = req.body
    let reqObj = { userId, userActivationStatus }
    try {
        const userActivationResponse = employeeModel.updateUserActivationStatus(reqObj)
        await res.status(200).send(userActivationResponse);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};


exports.deleteDeleteEmployee = async (req, res, next) => {
    let reqId = req.params.id
    try {
        employeeModel.deleteEmployee(reqId)
        await res.status(200).send("User deleted succesfully");
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
}


exports.postCreateEmployee = async (req, res, next) => {
    let reqObj = req.body
    try {
        const employeeObject = new employeeModel(req.userInfo, reqObj)
        employeeObject.createEmployee()
        await res.status(200).send("Employee created succesfully");
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
}