import topicModel from './topic.model'; // Import the model
import Topics from './topic.interface'; // Import the interface

// Service to create a topic
const createTopicToDB = async (subjectId: string, topicName: string): Promise<Topics> => {
    try {
        const newTopic = new topicModel({ subjectId, topicName });
        await newTopic.save();
        return newTopic;
    } catch (error) {
        throw new Error('Error creating topic');
    }
};

// Service to get all topics
const getTopicsFromDB = async (): Promise<Topics[]> => {
    try {
        const topics = await topicModel.find();
        return topics;
    } catch (error) {
        throw new Error('Error fetching topics');
    }
};

// Service to get topics by subjectId
const getTopicsBySubjectId = async (subjectId: string): Promise<Topics[]> => {
    try {
        const topics = await topicModel.find({ subjectId });
        return topics;
    } catch (error) {
        throw new Error('Error fetching topics for the given subject');
    }
};

// Service to update a topic by id
const updateTopicInDB = async (topicId: string, updatedData: Partial<Topics>): Promise<Topics | null> => {
    try {
        // Update the topic with the given topicId
        const updatedTopic = await topicModel.findByIdAndUpdate(topicId, updatedData, { new: true });
        return updatedTopic;
    } catch (error) {
        throw new Error('Error updating topic');
    }
};

// Service to delete a topic by id
const deleteTopicFromDB = async (topicId: string): Promise<boolean> => {
    try {
        const result = await topicModel.findByIdAndDelete(topicId);
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error('Error deleting topic');
    }
};

export { createTopicToDB, getTopicsFromDB, getTopicsBySubjectId, updateTopicInDB, deleteTopicFromDB };
