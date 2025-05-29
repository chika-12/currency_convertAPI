const User = require('../models/userModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

//Response object
const response = (res, token = null, statusCode, data = null) => {
  if (data === null) {
    res.status(statusCode).json({
      status: 'success',
      token,
    });
  } else {
    res.status(statusCode).json({
      status: 'success',
      data,
      token,
    });
  }
};

//sign up
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

  response(res, token, 200, userData);
});

// login
exports.loging = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(
      new AppError('email and password required for authentication', 400)
    );
  }
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );

  if (!user || !(await user.comparePassword(req.body.password))) {
    return next(new AppError('Invalid email or password', 401));
  }
  const token = signupToken(user._id);
  response(res, token, 200);
});

//protected route

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in, please log in', 401));
  }

  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRETS, (err, decoded) => {
      if (err) {
        const message =
          err.name === 'TokenExpiredError'
            ? 'Your token has expired please log in again'
            : 'invalid token';
        return next(reject(new AppError(message, 401)));
      }
      resolve(decoded);
    });
  });

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('user not found', 401));
  }

  // if (freshUser.passwordChanged(decoded.iat)) {
  //   return next(new AppError('Password Change detected. Log in again', 401));
  // }
  req.user = currentUser;
  next();
});
