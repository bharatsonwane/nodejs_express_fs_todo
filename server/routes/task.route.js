const express = require('express');

const auth = require('../helper/middleware/auth');
const taskController = require('../controllers/task.controller');

const router = express.Router();



router.post('/create', auth, taskController.postCreateTask);

router.get('/retrieve', auth, taskController.getRetrieveAllTask);

router.put('/update', auth, taskController.putUpdateTask);

router.delete('/:id', auth, taskController.deleteDeleteTask);

router.get('/:id', auth, taskController.getRetrieveTaskById);


module.exports = router;