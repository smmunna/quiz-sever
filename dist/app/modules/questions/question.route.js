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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const QuestionController = __importStar(require("./question.controller"));
const verifyToken_middleware_1 = __importDefault(require("../../middleware/verifyToken.middleware"));
const router = express_1.default.Router();
// CRUD routes
router.post('/', QuestionController.createQuestionController); // Create question
router.get('/', verifyToken_middleware_1.default, QuestionController.getAllQuestionsController); // Get all questions
router.get('/:id', verifyToken_middleware_1.default, QuestionController.getQuestionByIdController); // Get question by ID
router.put('/:id', verifyToken_middleware_1.default, QuestionController.updateQuestionController); // Update question by ID
router.delete('/:id', verifyToken_middleware_1.default, QuestionController.deleteQuestionController); // Delete question by ID
// Route to get questions by topic_id
router.get('/topic/:topic_id', verifyToken_middleware_1.default, QuestionController.getQuestionByTopicController);
exports.questionRoutes = router;
