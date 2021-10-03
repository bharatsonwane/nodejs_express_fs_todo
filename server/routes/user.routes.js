const express = require('express');
const auth = require('../helper/middleware/auth');

const userController = require('../controllers/user.controller');

const router = express.Router();


// router.post('/authJWT/owner/login', userController.postOwnerLogin);

router.post('/authJWT/login', userController.postUserLogin);

router.post('/manager/register', userController.postManagerRegister);

router.get('/retrieveProfile', auth, userController.getUserProfile);



module.exports = router;