import QuestionModel from './question.model';
import { ObjectId } from 'mongoose';

export const createQuestion = async (questionData: any) => {
    try {
        const newQuestion = new QuestionModel(questionData);
        await newQuestion.save();
        return newQuestion;
    } catch (error) {
        throw new Error('Error creating question');
    }
};

export const getAllQuestions = async () => {
    try {
        const questions = await QuestionModel.find();
        return questions;
    } catch (error) {
        throw new Error('Error fetching questions');
    }
};

export const getQuestionById = async (id: string) => {
    try {
        const question = await QuestionModel.findById(id);
        if (!question) throw new Error('Question not found');
        return question;
    } catch (error) {
        throw new Error('Error fetching question');
    }
};

export const updateQuestion = async (id: string, updatedData: any) => {
    try {
        const question = await QuestionModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!question) throw new Error('Question not found');
        return question;
    } catch (error) {
        throw new Error('Error updating question');
    }
};

export const deleteQuestion = async (id: string) => {
    try {
        const question = await QuestionModel.findByIdAndDelete(id);
        if (!question) throw new Error('Question not found');
        return { message: 'Question deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting question');
    }
};

// Service to get all questions by topic_id
export const getQuestionsByTopic = async (topicId: string) => {
    try {
        const questions = await QuestionModel.find({ topic_id: topicId });
        return questions;
    } catch (error) {
        throw new Error('Error fetching questions for the given topic');
    }
};