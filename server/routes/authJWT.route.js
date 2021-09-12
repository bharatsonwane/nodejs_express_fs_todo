const express = require('express');

const authController = require('../controllers/authJWT.controller');

const router = express.Router();



router.post('/user/register', authController.postRegisterUser);

router.post('/login', authController.postUserLogin);

// router.put('/resetPassword', authController.putResetPassword);



module.exports = router;