"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsByTopic = exports.deleteQuestion = exports.updateQuestion = exports.getQuestionById = exports.getAllQuestions = exports.createQuestion = void 0;
const question_model_1 = __importDefault(require("./question.model"));
const createQuestion = (questionData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuestion = new question_model_1.default(questionData);
        yield newQuestion.save();
        return newQuestion;
    }
    catch (error) {
        throw new Error('Error creating question');
    }
});
exports.createQuestion = createQuestion;
const getAllQuestions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield question_model_1.default.find();
        return questions;
    }
    catch (error) {
        throw new Error('Error fetching questions');
    }
});
exports.getAllQuestions = getAllQuestions;
const getQuestionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield question_model_1.default.findById(id);
        if (!question)
            throw new Error('Question not found');
        return question;
    }
    catch (error) {
        throw new Error('Error fetching question');
    }
});
exports.getQuestionById = getQuestionById;
const updateQuestion = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield question_model_1.default.findByIdAndUpdate(id, updatedData, { new: true });
        if (!question)
            throw new Error('Question not found');
        return question;
    }
    catch (error) {
        throw new Error('Error updating question');
    }
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield question_model_1.default.findByIdAndDelete(id);
        if (!question)
            throw new Error('Question not found');
        return { message: 'Question deleted successfully' };
    }
    catch (error) {
        throw new Error('Error deleting question');
    }
});
exports.deleteQuestion = deleteQuestion;
// Service to get all questions by topic_id
const getQuestionsByTopic = (topicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield question_model_1.default.find({ topic_id: topicId });
        return questions;
    }
    catch (error) {
        throw new Error('Error fetching questions for the given topic');
    }
});
exports.getQuestionsByTopic = getQuestionsByTopic;
