const express = require('express');
const auth = require('../helper/middleware/auth');

const authController = require('../controllers/authJWT.controller');

const router = express.Router();


router.post('/user/owner/login', authController.postOwnerLogin)

router.post('/user/manager/register', authController.postManagerRegister);

router.post('/user/employee/login', authController.postUserLogin);

router.post('/user/retrieveProfile', auth, authController.getUserProfile);



module.exports = router;