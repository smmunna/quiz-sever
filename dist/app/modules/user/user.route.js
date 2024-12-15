"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const verifyToken_middleware_1 = __importDefault(require("../../middleware/verifyToken.middleware"));
const router = express_1.default.Router();
// Route to create user
router.post('/', user_controller_1.userController.createUser);
// Route to get users list
router.get('/', verifyToken_middleware_1.default, user_controller_1.userController.getUsers);
// Route to update user
router.put('/:id', user_controller_1.userController.updateUser);
// Route to delete user
router.delete('/:id', user_controller_1.userController.deleteUser);
// Login Route
router.post('/login', user_controller_1.userController.signInUser);
// File Management Routes
router.post('/upload', user_controller_1.userController.fileUpload);
router.delete('/deletefile', user_controller_1.userController.deleteFileData);
// Payment Gateway Routes
// Redirect URL will be in app.ts file, Here redirect URL will not work
/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */
// router.get('/', verifyToken, isAdmin, checkUserRoleAndRateLimit, userController.getUsers)
exports.userRoutes = router;
