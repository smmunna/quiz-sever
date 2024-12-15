import { Schema, model } from 'mongoose';
import Subject from './subject.interface';

// Creating Schema
const subjectSchema = new Schema<Subject>({
    name: { type: String, required: true, trim: true }  // 'name' is a required string field
}, {
    timestamps: true  // This adds createdAt and updatedAt fields
});

// Creating a Model
const subjectModel = model<Subject>('subject', subjectSchema);

export default subjectModel;
