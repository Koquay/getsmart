const mongoose = require("mongoose");

const { ObjectId, Number } = mongoose.Schema.Types;

const TopicsSchema = new mongoose.Schema(
  {
    subjectId: {
        type: ObjectId,
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    subtopics: [
        {
            name: {
                type: String,
                required: true,
            },
            questions:[ 
            {
                question: {
                    type: String,
                    required: true,
                },

                multipleChoice: [
                    {type: String,
                    required: true,
                    _id: false,
                },
                                                            
                ],
                answer: {
                    type: String,
                    required: true,
                },  
                _id: false,
            },            
        ],
        studyNotes: [],

        _id: false,                      
        },
        
    ],    
    
  }
);

mongoose.model("Topics", TopicsSchema, 'getsmart-topics');

