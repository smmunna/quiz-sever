import express from 'express';
import * as QuestionController from './question.controller';
import verifyToken from '../../middleware/verifyToken.middleware';

const router = express.Router();

// CRUD routes
router.post('/', QuestionController.createQuestionController); // Create question
router.get('/', verifyToken, QuestionController.getAllQuestionsController); // Get all questions
router.get('/:id', verifyToken, QuestionController.getQuestionByIdController); // Get question by ID
router.put('/:id', verifyToken, QuestionController.updateQuestionController); // Update question by ID
router.delete('/:id', verifyToken, QuestionController.deleteQuestionController); // Delete question by ID
// Route to get questions by topic_id
router.get('/topic/:topic_id', verifyToken, QuestionController.getQuestionByTopicController);

export const questionRoutes = router;
