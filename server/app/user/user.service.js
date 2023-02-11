require('./user.model');
require('../subjects/subjects.model');

const Subjects = require('mongoose').model('Subjects')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');

const nodemailer = require('../utils/nodemailer');

const {
    v4: uuidv4
} = require('uuid');

const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);

exports.signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        if (!isLength(password, {
                min: 6
            })) {
            return res.status(422).send('Password must be minimum of 6 characters.')
        } else if (!isEmail(email)) {
            return res.status(422).send('Invalid email.')
        }

        let user = await User.findOne({
            email
        }).select('+password');
 
        if (!user) {
            return res.status(422).send("User with this credential does not exist.")
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        // console.log('passwordMatch', passwordMatch)

        if (!passwordMatch) return res.status(401).send('Invalid signin information.')

        return res.status(201).json({userData: getUserData(user)})
    } catch (error) {
        console.error(error);
        return res.status(500).send('Problem signing in user!')
    }
}

exports.signUp = async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await User.findOne({
            email: user.email
        });

        if (existingUser) {
            return res.status(422).send("User with this credentials already exists.")
        }

        let newUser = new User(user);
        newUser.password = bcrypt.hashSync(user.password, 10);        
        await newUser.save();

        const userData = getUserData(newUser);

        // console.log('userData', userData)
       
        return res.status(201).json({userData})

    } catch (error) {
        console.error(error);
        return res.status(500).send('Problem signing up user!')

    }
};

exports.authenticateUser = async (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(422).send(`You must be logged in to perform this action.`)
    }
    try {
        const {
            userId
        } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        
        if(!userId) {
            return res.status(422).send(`You must be logged in to add categories.`)
        }

        req.userId = userId;

        next();
    } catch(error) {
        console.error(error);

    }
}

const getUserData = (user) => {
    // console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)

    const tmpData = {...user};        
    const {email, password, createdAt, updatedAt, _id, ...userData} = tmpData._doc;

    let token = jwt.sign({
        userId: user._id,
    }, process.env.JWT_SECRET, {
        expiresIn: '365d'
    });
    
    userData.token = token;
    // console.log('userData', userData)
    return userData;
}

exports.verifyEmailForPasswordReset = async (req, res) => {
    const {
        email
    } = req.params;

    // console.log('email', email);

    try {
        const user = await User.findOne({
            email
        })

        // console.log('user', user);

        if (!user) {
            return res.status(500).send('Problem verifying your email to reset your password.');
        }

        // const verificationCode = uuidv4().substring(1, 5);
        const verificationCode = '12345';

        // console.log('verification code', verificationCode)

        const text = `<p>Please enter this verification code in the Reset Password form in the next 10 minutes:  <b>${verificationCode}</b></p>`
        const to = user.email;
        const subject = "Your password reset verification code"

        const msg = {
            to,
            subject,
            text
        }

        // nodemailer.sendEmail(msg, res);

        return res.status(200).json({
            verificationCode
        })


    } catch (error) {
        console.error(error);
        return res.status(500).send('Problems checking email for password reset');
    }

}


exports.resetPassword = async (req, res) => {
    try {
        const user = req.body;

        // console.log('user', user)

        const updatedUser = await User.findOneAndUpdate({
            email: user.email
        }, {
            $set: {
                password: bcrypt.hashSync(user.password, 10)
            }
        })

        return res.status(201).json({userData: getUserData(updatedUser)})

    } catch (error) {
        console.error(error);
        return res.status(500).send('Problem resetting password!')

    }
};

exports.logout = (req, res) => {
    try {
        const {
            userId
        } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        )

        if (userId) {
            jwt.sign({
                userId: userId
            }, process.env.JWT_SECRET, {
                expiresIn: 60
            })
        }
    } catch (error) {

    }

    res.status(201).json([])


}

exports.updateUserTestRecord = async (req, res) => {
    const {topicName, subtopicName, rightAnswers, wrongAnswers, date} = req.body;
    
    // let momentDate = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
   
    const {
        userId
    } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);    

    try {
        const existingUser = await User.findOne(
            {
                _id: userId,
                'testRecords.topic': topicName,
                'testRecords.subtopic': subtopicName
            },
        )    
    
        let user;
        
        if(existingUser) {
            const targetTestRecord = existingUser.testRecords.find(record => 
                record.topic === topicName && record.subtopic === subtopicName)

            let sortedScores = targetTestRecord.scores.sort((a, b) => (a.date > b.date) ? -1 : 1);
            sortedScores = sortedScores.slice(0, 4);
            const newScore = {rightAnswers, wrongAnswers, date};
            sortedScores.unshift(newScore)

            user = await User.findOneAndUpdate(
                {
                  _id: userId,
                  "testRecords.topic": topicName,
                  "testRecords.subtopic": subtopicName,
                },
                {
                    $set: {
                      "testRecords.$[element].scores": sortedScores
                    },
                  },
                // {
                //   $addToSet: {
                //     "testRecords.$[element].scores": {
                //       rightAnswers: rightAnswers,
                //       wrongAnswers: wrongAnswers,
                //       date: momentDate,
                //     },
                //   },
                // },
                {
                  arrayFilters: [
                    {
                      "element.topic": topicName,
                      "element.subtopic": subtopicName,
                    },
                  ],
                }
              );
        } else {
            user = await User.findOneAndUpdate(
                {
                    _id: userId,
                },
                { 
                    $addToSet : { 
                        testRecords : [
                            {
                                topic: topicName,
                                subtopic: subtopicName,
                                scores: [
                                    { 
                                        rightAnswers,
                                        wrongAnswers,
                                        date,
                                    }
                                ]
                            }
                        ] 
                    } 
                }
            )
        
        }

        return res.status(201).json(user.testRecords);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Problem updateing  user's test record")   
    }     
}

exports.getUserTestRecords = async (req, res) => {
    try {
        const user = await User.findOne(
            {
                _id: req.userId
            },
        )    

        let testRecords = user.testRecords.sort((a, b) => (a.scores[0].date > b.scores[0].date) ? -1 : 1);

        return res.status(200).json(testRecords);

    } catch(error) {
        console.log(error);
        return res.status(500).send("Problem getting  user's test record") 
    }
}


