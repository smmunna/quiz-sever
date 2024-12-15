import { Request, Response, NextFunction } from 'express';
import { createTopicToDB, getTopicsFromDB, getTopicsBySubjectId, updateTopicInDB, deleteTopicFromDB } from './topic.service'; // Import the service functions

// Controller to create a topic
const createTopic = async (req: Request, res: Response, next: NextFunction) => {
    const { subjectId, topicName } = req.body;

    try {
        const newTopic = await createTopicToDB(subjectId, topicName);
        res.status(201).json({
            success: true,
            message: 'Topic created successfully',
            topic: newTopic,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to get all topics
const getTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const topics = await getTopicsFromDB();
        res.status(200).json({
            success: true,
            message: 'Topics fetched successfully',
            topics,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to get topics by subjectId
const getTopicsBySubject = async (req: Request, res: Response, next: NextFunction) => {
    const { subjectId } = req.params;

    try {
        const topics = await getTopicsBySubjectId(subjectId);
        res.status(200).json({
            success: true,
            message: 'Topics fetched successfully',
            topics,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to update a topic by id
const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
    const { topicId } = req.params; // Get the topicId from params
    const { subjectId, topicName } = req.body; // Get the new topic data from the body

    try {
        const updatedTopic = await updateTopicInDB(topicId, { subjectId, topicName });
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
    } catch (error) {
        next(error);
    }
};

// Controller to delete a topic by id
const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
    const { topicId } = req.params; // Get the topicId from params

    try {
        const success = await deleteTopicFromDB(topicId);
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
    } catch (error) {
        next(error);
    }
};

export const topicController = { createTopic, getTopics, getTopicsBySubject, updateTopic, deleteTopic };
