"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
//==================Set up Multer for file handling Uploading to CloudStore=================
const storage = multer_1.default.memoryStorage(); // Store files in memory
const cloudStore = (0, multer_1.default)({ storage });
exports.default = cloudStore;
