const topicsService = require('./topics.service');

exports.getQuestionsForSubtopic = (req, res) => {
    console.log('topicsController.getQuestionsForSubtopic')
    topicsService.getQuestionsForSubtopic(req, res);
}