require('./subjects.model');
require('../topics/topics.model');

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')

const Subjects = require('mongoose').model('Subjects')
const Topics = require('mongoose').model('Topics')

exports.getSubjectsForGrade = async (req, res) => {
    console.log('subjectsService.getSubjects')

    try {        
        // const topicsDir = path.join(__dirname, "../topics/grade-9/science/Earth Science/Astronomy.json")
        // const data = JSON.parse(fs.readFileSync(topicsDir, 'utf-8'))
        // const topics = await Topics.create(data);
        // console.log(data)
        
        // const subjectsDir = path.join(__dirname, "./subjects.json")
        // const data = JSON.parse(fs.readFileSync(subjectsDir, 'utf-8'))
        // const subjectsData = await Subjects.create(data);
        // console.log(subjectsData)
        
        const {grade} = req.params;
        console.log('grade', grade)
        const subjects = await Subjects.find({grade}).select(['-topics'])
        
        console.log('subjects', subjects)
        res.status(200).json(subjects)
    } catch(error) {
        console.error(error);
        res.status(500).send('Error getting subjects.')
    }
    
}

exports.getTopicsForSubject = async (req, res) => {  
    const {subjectId} = req.params;
   
    try {
        const topics = await Topics.find({subjectId}).select(['-subtopics.questions'])
        console.log('topics', topics)
        res.status(200).json(topics)
    } catch(error) {

    }
}

exports.getDistinctGradeLevels = async (req, res) => {
    try {
        let distinctGradeLevels = await Subjects.find().distinct("grade")

        distinctGradeLevels = distinctGradeLevels.sort((a, b) => (a.grade > b.grade) ? -1 : 1);

        const gradeLevels = [];

        for(let grade of distinctGradeLevels) {
            gradeLevels.push({grade, label:'Grade ' + grade});        
        }

        res.status(200).json(gradeLevels)
    } catch(error) {
        console.error(error);
        res.status(500).send('Problem getting distinct grade levels.')
    }
}