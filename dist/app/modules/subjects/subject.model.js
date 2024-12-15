"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Creating Schema
const subjectSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true } // 'name' is a required string field
}, {
    timestamps: true // This adds createdAt and updatedAt fields
});
// Creating a Model
const subjectModel = (0, mongoose_1.model)('subject', subjectSchema);
exports.default = subjectModel;
