const { ApolloError } = require('apollo-server-express');
const Exam = require("../models/exam.model");

const resolvers = {
    Query: {
        // Query for all exams
        exams: async () => {
            try {
                const exams = await Exam.find({});
                return exams;
            } catch (error) {
                throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR');
            }
        },

        // Query for a single exam by id
        exam: async (_, { id }) => {
            try {
                const exam = await Exam.findById(id);
                if (!exam) {
                    // If the exam is not found, throw a 404 error
                    throw new ApolloError('Exam not found', 'NOT_FOUND');
                }
                return exam;
            } catch (error) {
                throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR');
            }
        },
    },

    Mutation: {
        // Mutation for creating an exam
        createExam: async (_, args) => {
            try {
                const newExam = new Exam(args);
                const savedExam = await newExam.save();
                return savedExam;
            } catch (error) {
                throw new ApolloError('Failed to create exam', 'INTERNAL_SERVER_ERROR');
            }
        },

        // Mutation for updating an exam
        updateExam: async (_, { id, ...updates }) => {
            try {
                const exam = await Exam.findByIdAndUpdate(id, updates, { new: true });
                if (!exam) {
                    // If the exam is not found, throw a 404 error
                    throw new ApolloError('Exam not found', 'NOT_FOUND');
                }
                return exam;
            } catch (error) {
                throw new ApolloError('Failed to update exam', 'INTERNAL_SERVER_ERROR');
            }
        },

        // Mutation for deleting an exam
        deleteExam: async (_, { id }) => {
            try {
                // Try to delete the exam by ID
                const exam = await Exam.findByIdAndDelete(id);

                // If no exam is found, throw a "Not Found" error
                if (!exam) {
                    throw new ApolloError('Exam not found', 'NOT_FOUND');
                }

                // Return a success message if the deletion is successful
                return "Exam deleted successfully";
            } catch (error) {
                // If the error is a known ApolloError, rethrow it
                if (error instanceof ApolloError) {
                    throw error;
                }
                // Handle any unexpected errors (e.g., DB connection failure)
                throw new ApolloError('Failed to delete exam', 'INTERNAL_SERVER_ERROR');
            }
        },
    },
};

module.exports = resolvers;
