import express from 'express';
import { subjectController } from './subject.controller';

const router = express.Router();

// Route to create a new subject
router.post('/', subjectController.createSubject);

// Route to get all subjects
router.get('/', subjectController.getSubjects);

// Route to get a subject by ID
router.get('/:subjectId', subjectController.getSubject);

// Route to update a subject by ID
router.put('/:subjectId', subjectController.updateSubject);

// Route to delete a subject by ID
router.delete('/:subjectId', subjectController.deleteSubject);

export const subjectRoutes = router;
