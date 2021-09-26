const express = require('express');

const authController = require('../controllers/authJWT.controller');

const router = express.Router();


router.post('/user/owner/login', authController.postOwnerLogin)

router.post('/user/manager/register', authController.postManagerRegister);

router.post('/user/employee/login', authController.postUserLogin);



module.exports = router;