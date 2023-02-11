const mongoose = require("mongoose");

const { ObjectId, String, Number } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  
  testRecords: [
    {
      subject: String,
      topic: String,
      subtopic: String,
      scores: [
        {
          rightAnswers: Number,
          wrongAnswers: Number,
          date: Date,
          _id: false,
        }
      ],
      _id: false,
      select: false
    }
  ]
},
  {
    timestamps: true,
  }
);

mongoose.model("User", UserSchema, 'getsmart-users');
