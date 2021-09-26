const express = require('express');

const auth = require('../helper/middleware/auth');
const feedbackController = require('../controllers/feedback.controller');

const router = express.Router();



router.post('/create', feedbackController.postCreateFeedback);

router.get('/retrieve', auth, feedbackController.getRetrieveAllFeedback);


module.exports = router;