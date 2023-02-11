require('../topics/topics.model');
require('../user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Topics = require('mongoose').model('Topics')
const User = require('mongoose').model('User')

exports.getQuestionsForSubtopic = async (req, res) => {
    console.log('topicsService.getQuestionsForSubtopic')
    const {subtopicParams} = req.query;
    const params = JSON.parse(subtopicParams);
    const {topicId, subtopicName} = params;

    console.log('topicId, subtopcName', topicId, subtopicName)

    try {
        const topic = await Topics.findOne({
            _id: topicId,
            'subtopics.name': subtopicName
        });

        const subtopic = topic.subtopics.find(subtopic => subtopic.name === subtopicName)
        console.log('subtopic', subtopic)

        const testRecords = getUserTestRecords(req, res, topic.name, subtopicName);

        return res.status(200).json(
            {
                questions: subtopic.questions, 
                studyNotes: subtopic.studyNotes,
                testRecords
            });

    } catch(error) {
        console.log('error', error);
        return res.status(500).send('Problem getting questions for subtopic')
    }
}

const getUserTestRecords = async (req, res, topicName, subtopicName) => {
    if(!req.headers.authorization) {
         res.status(422).send(`You must be logged in to perform this action.`)
         process.exit(0)
    }
    try {
        const {
            userId
        } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        
        if(!userId) {
            return res.status(422).send(`You must be logged in to add categories.`)
        }

        const user = await User.findOne(
            {
                _id: userId,
                'testRecords.topic': topicName,
                'testRecords.subtopic': subtopicName,                
            }).select(['-_id', 'testRecords'])

        console.log('testRecords', user?.testRecords)

        return user?.testRecords || []
        
        // .filter(record => 
        //     record.topicName === topicName && record.subtopicName === subtopicName)
    } catch(error) {
        console.error(error);
        return res.status(500).send("Problem getting user's test records")
    
    }
}