"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const subject_controller_1 = require("./subject.controller");
const router = express_1.default.Router();
// Route to create a new subject
router.post('/', subject_controller_1.subjectController.createSubject);
// Route to get all subjects
router.get('/', subject_controller_1.subjectController.getSubjects);
// Route to get a subject by ID
router.get('/:subjectId', subject_controller_1.subjectController.getSubject);
// Route to update a subject by ID
router.put('/:subjectId', subject_controller_1.subjectController.updateSubject);
// Route to delete a subject by ID
router.delete('/:subjectId', subject_controller_1.subjectController.deleteSubject);
exports.subjectRoutes = router;
