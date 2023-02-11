const subjectsService = require('./subjects.service');

exports.getSubjectsForGrade = (req, res) => {
    console.log('subjectsController.getSubjectsGrade')
    subjectsService.getSubjectsForGrade(req, res);
}

exports.getTopicsForSubject = (req, res) => {
    console.log('subjectsController.getTopicsForSubjectsGrade')
    subjectsService.getTopicsForSubject(req, res);
}

exports.getDistinctGradeLevels = (req, res) => {
    console.log('subjectsController.getDistinctGradeLevels')
    subjectsService.getDistinctGradeLevels(req, res);
}

