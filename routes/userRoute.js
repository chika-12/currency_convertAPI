const express = require('express');
const userRouter = express.Router();
const authenticate = require('../controllers/authentication');

userRouter.route('/signUp').post(authenticate.registerUser);

module.exports = userRouter;
