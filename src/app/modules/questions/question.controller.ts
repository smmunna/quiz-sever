import { Request, Response, NextFunction } from 'express';
import * as QuestionService from './question.service';

export const createQuestionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questionData = req.body;
        const newQuestion = await QuestionService.createQuestion(questionData);
        res.status(201).json({ success: true, data: newQuestion });
    } catch (error) {
        next(error);
    }
};

export const getAllQuestionsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questions = await QuestionService.getAllQuestions();
        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        next(error);
    }
};

export const getQuestionByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const question = await QuestionService.getQuestionById(id);
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        next(error);
    }
};

export const updateQuestionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedQuestion = await QuestionService.updateQuestion(id, updatedData);
        res.status(200).json({ success: true, data: updatedQuestion });
    } catch (error) {
        next(error);
    }
};

export const deleteQuestionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const response = await QuestionService.deleteQuestion(id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const getQuestionByTopicController = async (req: Request, res: Response, next: NextFunction) => {
    const { topic_id } = req.params; // Assuming topic_id is passed as a route parameter
    try {
        const response = await QuestionService.getQuestionsByTopic(topic_id)
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};