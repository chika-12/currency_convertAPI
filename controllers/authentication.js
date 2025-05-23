const User = require('../models/userModels');
const user = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signupToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETS, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
exports.registerUser = catchAsync(async (req, res, next) => {
  const userData = await User.create(req.body);

  if (!userData) {
    return next(new AppError('Data not created', 503));
  }

  const token = signupToken(userData._id);

  res.status(200).json({
    message: 'success',
    userData,
    token,
  });
});
exports.loging = catchAsync(async (req, res, next) => {
  const user = User.findOne({ email: req.body.email });
});
