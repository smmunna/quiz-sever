"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectController = void 0;
const subject_service_1 = require("./subject.service"); // Import the service functions
// Controller to create a new subject
const createSubject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const newSubject = yield (0, subject_service_1.createSubjectToDB)(name);
        res.status(201).json({
            success: true,
            message: 'Subject created successfully',
            subject: newSubject,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller to get all subjects
const getSubjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield (0, subject_service_1.getSubjectsFromDB)();
        res.status(200).json({
            success: true,
            message: 'Subjects fetched successfully',
            subjects,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller to get a subject by ID
const getSubject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.params;
    try {
        const subject = yield (0, subject_service_1.getSubjectById)(subjectId);
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
    }
    catch (error) {
        next(error);
    }
});
// Controller to update a subject by ID
const updateSubject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.params; // Get the subjectId from params
    const { name } = req.body; // Get the new subject name from the body
    try {
        const updatedSubject = yield (0, subject_service_1.updateSubjectInDB)(subjectId, { name });
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
    }
    catch (error) {
        next(error);
    }
});
// Controller to delete a subject by ID
const deleteSubject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.params; // Get the subjectId from params
    try {
        const success = yield (0, subject_service_1.deleteSubjectFromDB)(subjectId);
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
    }
    catch (error) {
        next(error);
    }
});
exports.subjectController = { createSubject, getSubjects, getSubject, updateSubject, deleteSubject };
