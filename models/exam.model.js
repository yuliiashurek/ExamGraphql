const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema(
  {
    lastName: {
      type: String,
      required: [true, "Please enter the last name"],
    },

    group: {
      type: String,
      required: [true, "Please enter the group"],
    },

    subject: {
      type: String,
      required: [true, "Please enter the subject"],
    },

    ticketNumber: {
      type: Number,
      required: false,
      default: 0, 
    },

    grade: {
      type: Number,
      required: false,
      default: 0, 
    },

    instructor: {
      type: String,
      required: [true, "Please enter the instructor's name"],
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
