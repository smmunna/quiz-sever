"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionByTopicController = exports.deleteQuestionController = exports.updateQuestionController = exports.getQuestionByIdController = exports.getAllQuestionsController = exports.createQuestionController = void 0;
const QuestionService = __importStar(require("./question.service"));
const createQuestionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionData = req.body;
        const newQuestion = yield QuestionService.createQuestion(questionData);
        res.status(201).json({ success: true, data: newQuestion });
    }
    catch (error) {
        next(error);
    }
});
exports.createQuestionController = createQuestionController;
const getAllQuestionsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield QuestionService.getAllQuestions();
        res.status(200).json({ success: true, data: questions });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllQuestionsController = getAllQuestionsController;
const getQuestionByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield QuestionService.getQuestionById(id);
        res.status(200).json({ success: true, data: question });
    }
    catch (error) {
        next(error);
    }
});
exports.getQuestionByIdController = getQuestionByIdController;
const updateQuestionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedQuestion = yield QuestionService.updateQuestion(id, updatedData);
        res.status(200).json({ success: true, data: updatedQuestion });
    }
    catch (error) {
        next(error);
    }
});
exports.updateQuestionController = updateQuestionController;
const deleteQuestionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield QuestionService.deleteQuestion(id);
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteQuestionController = deleteQuestionController;
const getQuestionByTopicController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic_id } = req.params; // Assuming topic_id is passed as a route parameter
    try {
        const response = yield QuestionService.getQuestionsByTopic(topic_id);
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.getQuestionByTopicController = getQuestionByTopicController;
