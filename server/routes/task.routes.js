const express = require('express');

const auth = require('../helper/middleware/auth');
const taskController = require('../controllers/task.controller');

const router = express.Router();



router.post('/create', auth, taskController.postCreateTask);
router.post('/', auth, taskController.postCreateTask); // create task

router.get('/retrieveList', auth, taskController.getRetrieveTaskList);
router.get('/', auth, taskController.getRetrieveTaskList); // retrieve task list

router.get('/retrieve/:id', auth, taskController.getRetrieveTaskById);

router.put('/update', auth, taskController.putUpdateTask);
router.put('/', auth, taskController.putUpdateTask); // update task

router.delete('/:id', auth, taskController.deleteDeleteTask);

router.put('/updateCompleteStatus', auth, taskController.putUpdateTaskCompleteStatus);

router.put('/updateTestingReport', auth, taskController.putUpdateTaskTestingReport);


module.exports = router;