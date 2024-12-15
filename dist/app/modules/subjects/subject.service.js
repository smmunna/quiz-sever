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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubjectFromDB = exports.updateSubjectInDB = exports.getSubjectById = exports.getSubjectsFromDB = exports.createSubjectToDB = void 0;
const subject_model_1 = __importDefault(require("./subject.model")); // Import the model
// Service to create a new subject
const createSubjectToDB = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubject = new subject_model_1.default({ name });
        yield newSubject.save();
        return newSubject;
    }
    catch (error) {
        throw new Error('Error creating subject');
    }
});
exports.createSubjectToDB = createSubjectToDB;
// Service to get all subjects
const getSubjectsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield subject_model_1.default.find();
        return subjects;
    }
    catch (error) {
        throw new Error('Error fetching subjects');
    }
});
exports.getSubjectsFromDB = getSubjectsFromDB;
// Service to get a subject by id
const getSubjectById = (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield subject_model_1.default.findById(subjectId);
        return subject;
    }
    catch (error) {
        throw new Error('Error fetching subject by ID');
    }
});
exports.getSubjectById = getSubjectById;
// Service to update a subject by id
const updateSubjectInDB = (subjectId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSubject = yield subject_model_1.default.findByIdAndUpdate(subjectId, updatedData, { new: true });
        return updatedSubject;
    }
    catch (error) {
        throw new Error('Error updating subject');
    }
});
exports.updateSubjectInDB = updateSubjectInDB;
// Service to delete a subject by id
const deleteSubjectFromDB = (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subject_model_1.default.findByIdAndDelete(subjectId);
        if (result) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw new Error('Error deleting subject');
    }
});
exports.deleteSubjectFromDB = deleteSubjectFromDB;
