import subjectModel from './subject.model'; // Import the model
import Subject from './subject.interface'; // Import the interface

// Service to create a new subject
const createSubjectToDB = async (name: string): Promise<Subject> => {
    try {
        const newSubject = new subjectModel({ name });
        await newSubject.save();
        return newSubject;
    } catch (error) {
        throw new Error('Error creating subject');
    }
};

// Service to get all subjects
const getSubjectsFromDB = async (): Promise<Subject[]> => {
    try {
        const subjects = await subjectModel.find();
        return subjects;
    } catch (error) {
        throw new Error('Error fetching subjects');
    }
};

// Service to get a subject by id
const getSubjectById = async (subjectId: string): Promise<Subject | null> => {
    try {
        const subject = await subjectModel.findById(subjectId);
        return subject;
    } catch (error) {
        throw new Error('Error fetching subject by ID');
    }
};

// Service to update a subject by id
const updateSubjectInDB = async (subjectId: string, updatedData: Partial<Subject>): Promise<Subject | null> => {
    try {
        const updatedSubject = await subjectModel.findByIdAndUpdate(subjectId, updatedData, { new: true });
        return updatedSubject;
    } catch (error) {
        throw new Error('Error updating subject');
    }
};

// Service to delete a subject by id
const deleteSubjectFromDB = async (subjectId: string): Promise<boolean> => {
    try {
        const result = await subjectModel.findByIdAndDelete(subjectId);
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error('Error deleting subject');
    }
};

export { createSubjectToDB, getSubjectsFromDB, getSubjectById, updateSubjectInDB, deleteSubjectFromDB };
