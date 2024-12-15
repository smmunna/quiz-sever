import { Request, Response, NextFunction } from 'express';
import { createSubjectToDB, getSubjectsFromDB, getSubjectById, updateSubjectInDB, deleteSubjectFromDB } from './subject.service'; // Import the service functions

// Controller to create a new subject
const createSubject = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    try {
        const newSubject = await createSubjectToDB(name);
        res.status(201).json({
            success: true,
            message: 'Subject created successfully',
            subject: newSubject,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to get all subjects
const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjects = await getSubjectsFromDB();
        res.status(200).json({
            success: true,
            message: 'Subjects fetched successfully',
            subjects,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to get a subject by ID
const getSubject = async (req: Request, res: Response, next: NextFunction) => {
    const { subjectId } = req.params;

    try {
        const subject = await getSubjectById(subjectId);
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Subject fetched successfully',
            subject,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to update a subject by ID
const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
    const { subjectId } = req.params; // Get the subjectId from params
    const { name } = req.body; // Get the new subject name from the body

    try {
        const updatedSubject = await updateSubjectInDB(subjectId, { name });
        if (!updatedSubject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Subject updated successfully',
            subject: updatedSubject,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to delete a subject by ID
const deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
    const { subjectId } = req.params; // Get the subjectId from params

    try {
        const success = await deleteSubjectFromDB(subjectId);
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Subject deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const subjectController = { createSubject, getSubjects, getSubject, updateSubject, deleteSubject };
