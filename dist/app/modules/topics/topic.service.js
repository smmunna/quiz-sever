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
exports.deleteTopicFromDB = exports.updateTopicInDB = exports.getTopicsBySubjectId = exports.getTopicsFromDB = exports.createTopicToDB = void 0;
const topic_model_1 = __importDefault(require("./topic.model")); // Import the model
// Service to create a topic
const createTopicToDB = (subjectId, topicName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTopic = new topic_model_1.default({ subjectId, topicName });
        yield newTopic.save();
        return newTopic;
    }
    catch (error) {
        throw new Error('Error creating topic');
    }
});
exports.createTopicToDB = createTopicToDB;
// Service to get all topics
const getTopicsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_model_1.default.find();
        return topics;
    }
    catch (error) {
        throw new Error('Error fetching topics');
    }
});
exports.getTopicsFromDB = getTopicsFromDB;
// Service to get topics by subjectId
const getTopicsBySubjectId = (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_model_1.default.find({ subjectId });
        return topics;
    }
    catch (error) {
        throw new Error('Error fetching topics for the given subject');
    }
});
exports.getTopicsBySubjectId = getTopicsBySubjectId;
// Service to update a topic by id
const updateTopicInDB = (topicId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update the topic with the given topicId
        const updatedTopic = yield topic_model_1.default.findByIdAndUpdate(topicId, updatedData, { new: true });
        return updatedTopic;
    }
    catch (error) {
        throw new Error('Error updating topic');
    }
});
exports.updateTopicInDB = updateTopicInDB;
// Service to delete a topic by id
const deleteTopicFromDB = (topicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield topic_model_1.default.findByIdAndDelete(topicId);
        if (result) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw new Error('Error deleting topic');
    }
});
exports.deleteTopicFromDB = deleteTopicFromDB;
