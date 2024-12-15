"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Creating Schema for Question
const questionSchema = new mongoose_1.Schema({
    topic_id: { type: String, required: true },
    text: { type: String, required: true },
    options: { type: [String], required: true },
    correct_answer: { type: String, required: true },
    explanation: { type: String, required: true }
}, { timestamps: true });
// Creating a Model for Question
const QuestionModel = (0, mongoose_1.model)('Question', questionSchema);
exports.default = QuestionModel;
