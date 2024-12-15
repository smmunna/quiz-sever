import express from 'express';
import { topicController } from './topic.controller';

const router = express.Router();

// Route to create a topic
router.post('/', topicController.createTopic);

// Route to get all topics
router.get('/', topicController.getTopics);

// Route to get topics by subjectId
router.get('/:subjectId', topicController.getTopicsBySubject);

// Route to update a topic by id
router.put('/:topicId', topicController.updateTopic);

// Route to delete a topic by id
router.delete('/:topicId', topicController.deleteTopic);

export const topicRoutes = router;
