"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRoutes = void 0;
const express_1 = __importDefault(require("express"));
const topic_controller_1 = require("./topic.controller");
const router = express_1.default.Router();
// Route to create a topic
router.post('/', topic_controller_1.topicController.createTopic);
// Route to get all topics
router.get('/', topic_controller_1.topicController.getTopics);
// Route to get topics by subjectId
router.get('/:subjectId', topic_controller_1.topicController.getTopicsBySubject);
// Route to update a topic by id
router.put('/:topicId', topic_controller_1.topicController.updateTopic);
// Route to delete a topic by id
router.delete('/:topicId', topic_controller_1.topicController.deleteTopic);
exports.topicRoutes = router;
