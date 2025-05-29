const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModels');

//fields for patch request
const allowedFields = ['bio', 'country_of_residence', 'profile_image'];
const filtered = (body, allowedFields) => {
  let filtered = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      filtered[key] = body[key];
    }
  }
  return filtered;
};

//response object
const response = (res, data, statusCode) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

//Get user profile
exports.profile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  response(res, user, 200);
});

//update user profile
exports.profileUpDate = catchAsync(async (req, res, next) => {
  const update = filtered(req.body, allowedFields);
  const userUpdate = await User.findByIdAndUpdate(req.user.id, update, {
    new: true,
    runValidators: true,
  });
  if (!userUpdate) {
    return next(new AppError('Unfinished request', 500));
  }
  response(res, userUpdate, 200);
});
