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
exports.UserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// Creating new user
// User service to check if the user already exists
const createUserToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user with the same email already exists
    const existingUser = yield user_model_1.default.findOne({ email: user.email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    // If no existing user, create the new user
    const result = yield user_model_1.default.create(user);
    return result;
});
// Getting all users
const getAllUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const users = yield user_model_1.default
        .find({}, { password: 0, role: 0 })
        .sort({ createdAt: -1 }) // Exclude password and role fields
        .skip(skip)
        .limit(limit);
    const totalUsers = yield user_model_1.default.countDocuments(); // Get total number of users
    return { users, totalUsers, totalPages: Math.ceil(totalUsers / limit) };
});
// Update user in the database
const updateUserInDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
// Delete user from the database
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.UserService = {
    createUserToDB,
    getAllUsers,
    updateUserInDB,
    deleteUserFromDB
};
