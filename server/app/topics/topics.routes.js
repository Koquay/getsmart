const router = require('express').Router();
const topicsController = require('./topics.controller');


router.get('/questions', topicsController.getQuestionsForSubtopic);

module.exports = router;