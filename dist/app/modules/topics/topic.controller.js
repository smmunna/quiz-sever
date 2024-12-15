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
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicController = void 0;
const topic_service_1 = require("./topic.service"); // Import the service functions
// Controller to create a topic
const createTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, topicName } = req.body;
    try {
        const newTopic = yield (0, topic_service_1.createTopicToDB)(subjectId, topicName);
        res.status(201).json({
            success: true,
            message: 'Topic created successfully',
            topic: newTopic,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller to get all topics
const getTopics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield (0, topic_service_1.getTopicsFromDB)();
        res.status(200).json({
            success: true,
            message: 'Topics fetched successfully',
            topics,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller to get topics by subjectId
const getTopicsBySubject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.params;
    try {
        const topics = yield (0, topic_service_1.getTopicsBySubjectId)(subjectId);
        res.status(200).json({
            success: true,
            message: 'Topics fetched successfully',
            topics,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller to update a topic by id
const updateTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId } = req.params; // Get the topicId from params
    const { subjectId, topicName } = req.body; // Get the new topic data from the body
    try {
        const updatedTopic = yield (0, topic_service_1.updateTopicInDB)(topicId, { subjectId, topicName });
        if (!updatedTopic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Topic updated successfully',
            topic: updatedTopic,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller to delete a topic by id
const deleteTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId } = req.params; // Get the topicId from params
    try {
        const success = yield (0, topic_service_1.deleteTopicFromDB)(topicId);
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Topic deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.topicController = { createTopic, getTopics, getTopicsBySubject, updateTopic, deleteTopic };
