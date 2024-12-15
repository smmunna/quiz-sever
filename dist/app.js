"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
// Import your routes here
const user_route_1 = require("./app/modules/user/user.route");
const helmet_1 = __importDefault(require("helmet"));
const orders_route_1 = require("./app/modules/orders/orders.route");
const orders_controller_1 = require("./app/modules/orders/orders.controller");
const subject_route_1 = require("./app/modules/subjects/subject.route");
const topic_route_1 = require("./app/modules/topics/topic.route");
const question_route_1 = require("./app/modules/questions/question.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Helmet for Security purpose, hiding the 'Express' server name from Header
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Handling uploading the files to server
app.use('/uploads', express_1.default.static('uploads'));
/*
Payment Gateway redirection URL success, fail and cancel
Don't move after the cors policy, it will not work there.
Will show the response like Access Blocked.
*/
app.use('/success/:tranId', orders_controller_1.orderController.success);
app.use('/fail/:tranId', orders_controller_1.orderController.fail);
app.use('/cancel/:tranId', orders_controller_1.orderController.cancel);
// Allow only requests from a specific domain, frontend domain url eg. http://www.example.com
const allowedDomains = ['http://localhost:5173', 'https://quiz.techzaint.com']; // You can add more domains by separating with comma.
// default React.js frontend local domain url
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (allowedDomains.includes(origin) || !origin) { // Allow if the request is from the allowed domain or if there's no origin (e.g., from Postman)
            callback(null, true);
        }
        else {
            callback(new Error('Access blocked: Unauthorized access!!!'));
        }
    },
    credentials: true, // Enable if you want to allow cookies with the request
}));
/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/
app.use('/api/v1/users', user_route_1.userRoutes); //users routes
app.use('/api/v1/orders', orders_route_1.orderRoutes); //orders routes
app.use('/api/v1/subjects', subject_route_1.subjectRoutes); //subjects routes
app.use('/api/v1/topics', topic_route_1.topicRoutes); //topics routes
app.use('/api/v1/questions', question_route_1.questionRoutes); //questions routes
/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/
// Home route json messages
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Quiz App Server',
        author: 'Minhazul Abedin Munna',
        github: 'https://github.com/smmunna',
        linkedin: 'https://www.linkedin.com/in/minhazulabedinmunna/',
        website: 'https://www.techzaint.com'
    });
});
// Route Error for any  url not found
app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});
exports.default = app;
