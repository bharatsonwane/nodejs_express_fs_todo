const express = require('express');

const auth = require('../helper/middleware/auth');
const employeeController = require('../controllers/employee.controller');
const router = express.Router();


router.get('/retrieveList', auth, employeeController.getRetrieveEmployeeList);

router.get('/retrieve/:id', auth, employeeController.getRetrieveEmployeeById);

router.put('/update/userActivationStatus', auth, employeeController.putUpdateUserActivationStatus)

router.delete('/:id', auth, employeeController.deleteDeleteEmployee);

router.post('/create', auth, employeeController.postCreateEmployee);



module.exports = router;