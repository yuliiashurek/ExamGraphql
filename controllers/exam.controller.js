const Exam = require("../models/exam.model");

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByIdAndUpdate(id, req.body);

    if (!exam) {
      return res.status(404).json({ message: "Exam record not found" });
    }

    const updatedExam = await Exam.findById(id);
    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return res.status(404).json({ message: "Exam record is not found" });
    }

    res.status(200).json({ message: "Exam record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
};