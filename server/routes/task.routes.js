const express = require('express');

const auth = require('../helper/middleware/auth');
const taskController = require('../controllers/task.controller');

const router = express.Router();



router.post('/create', auth, taskController.postCreateTask);

router.get('/retrieveList', auth, taskController.getRetrieveTaskList);

router.get('/retrieve/:id', auth, taskController.getRetrieveTaskById);

router.put('/update', auth, taskController.putUpdateTask);

router.delete('/:id', auth, taskController.deleteDeleteTask);



module.exports = router;