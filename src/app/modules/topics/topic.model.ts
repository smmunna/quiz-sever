import { Schema, model } from 'mongoose';
import Topics from './topic.interface'; // Import the interface

// Creating Schema for Topics
const topicSchema = new Schema<Topics>({
    subjectId: { type: String, required: true },
    topicName: { type: String, required: true }
}, { timestamps: true }); // Timestamps for createdAt and updatedAt

// Creating the model
const topicModel = model<Topics>('Topic', topicSchema);

export default topicModel;
