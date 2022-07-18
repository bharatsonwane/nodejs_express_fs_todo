const express = require('express');

const projectController = require('../controllers/project.controller');

const router = express.Router();



router.post('/', projectController.postCreateProject);

router.put('/', projectController.putUpdateProject);

router.get("/", projectController.getRetrieveProjectList);

router.get('/:id', projectController.getRetrieveProjectById);

router.delete('/:id', projectController.deleteDeleteProject);

module.exports = router;