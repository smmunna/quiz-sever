"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Creating Schema for Topics
const topicSchema = new mongoose_1.Schema({
    subjectId: { type: String, required: true },
    topicName: { type: String, required: true }
}, { timestamps: true }); // Timestamps for createdAt and updatedAt
// Creating the model
const topicModel = (0, mongoose_1.model)('Topic', topicSchema);
exports.default = topicModel;
