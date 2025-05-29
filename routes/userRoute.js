const express = require('express');
const userRouter = express.Router();
const authenticate = require('../controllers/authentication');
const userController = require('../controllers/userControlers');

userRouter.route('/signUp').post(authenticate.registerUser);
userRouter.route('/login').post(authenticate.loging);

userRouter.route('/profile').get(authenticate.protect, userController.profile);
userRouter
  .route('/profileupdate')
  .patch(authenticate.protect, userController.profileUpDate);
module.exports = userRouter;
