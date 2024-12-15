import { Schema, model } from 'mongoose';
import Question from './question.interface';

// Creating Schema for Question
const questionSchema = new Schema<Question>({
    topic_id: { type: String, required: true },
    text: { type: String, required: true },
    options: { type: [String], required: true },
    correct_answer: { type: String, required: true },
    explanation: { type: String, required: true }
}, { timestamps: true });

// Creating a Model for Question
const QuestionModel = model<Question>('Question', questionSchema);

export default QuestionModel;
