const mongoose = require("mongoose");

const { ObjectId, Number } = mongoose.Schema.Types;

const SubjectsSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    topics: [
        {
          topic: {
          type: ObjectId,
          ref: "Topics",        
          },
          _id: false,
        }
      ],
  }
);

mongoose.model("Subjects", SubjectsSchema, 'getsmart-subjects');

