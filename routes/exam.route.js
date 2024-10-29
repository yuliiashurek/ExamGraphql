const express = require('express');
const router = express.Router();
const Exam = require('../models/exam.model');

// Route for the home page with a list of exam records
router.get('/', async (req, res) => {
    try {
        const examRecords = await Exam.find();
        res.render('index', { examRecords: examRecords });
    } catch (error) {
        res.status(500).send('Error retrieving exam records');
    }
});

// Route for the page to create a new exam record
router.get('/new', (req, res) => {
    res.render('exam');
});

// Creating a new exam record
router.post('/new', async (req, res) => {
    try {
        const existingRecord = await Exam.findOne({
            lastName: req.body.lastName,
            group: req.body.group,
            subject: req.body.subject
        });

        if (existingRecord) {
            return res.status(400).send('Record already exists for this student and subject');
        }

        const examRecord = new Exam(req.body);
        await examRecord.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating exam record');
    }
});

// Route for editing an exam record
router.get('/edit/:id', async (req, res) => {
    try {
        const examRecord = await Exam.findById(req.params.id);
        if (!examRecord) {
            return res.status(404).send('Exam record not found');
        }
        res.render('edit', { examRecord: examRecord });
    } catch (error) {
        res.status(500).send('Error retrieving exam record');
    }
});

// Updating exam record information
router.post('/edit/:id', async (req, res) => {
    try {
        const existingRecord = await Exam.findOne({
            lastName: req.body.lastName,
            group: req.body.group,
            subject: req.body.subject,
            _id: { $ne: req.params.id }
        });

        if (existingRecord) {
            return res.status(400).send('Record already exists for this student and subject');
        }

        const updatedExamRecord = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExamRecord) {
            return res.status(404).send('Exam record not found');
        }
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error updating exam record');
    }
});

// Deleting an exam record
router.post('/delete/:id', async (req, res) => {
    try {
        const deletedExamRecord = await Exam.findByIdAndDelete(req.params.id);
        if (!deletedExamRecord) {
            return res.status(404).send('Exam record not found');
        }
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting exam record');
    }
});

// Returning exam records in JSON format
router.get('/api/exam', async (req, res) => {
    try {
        const examRecords = await Exam.find();
        res.json(examRecords);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving exam records' });
    }
});

module.exports = router;
