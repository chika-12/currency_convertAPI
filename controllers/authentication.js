const User = require('../models/userModels');
const user = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');

exports.registerUser = catchAsync(async (req, res, next) => {
  const userData = await User.create(req.body);

  if (!userData) {
    return next(new AppError('Data not created', 503));
  }

  res.status(200).json({
    message: 'success',
    userData,
  });
});
