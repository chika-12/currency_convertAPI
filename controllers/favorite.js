const Favorite = require('../models/favorite');
const User = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.postFavorite = catchAsync(async (req, res, next) => {
  const { base, target } = req.body;
  const userId = req.user.id;

  if (!base || !target) {
    return next(new AppError('Base and target currencies are required.', 400));
  }
  try {
    const favoritePost = await Favorite.create({
      userId,
      base: base.toUpperCase(),
      target: target.toUpperCase(),
    });

    if (!favoritePost) {
      return next(new AppError('Data not posted', 500));
    }

    res.status(201).json({
      status: 'success',
      message: 'currency pair saved to favorite',
      favoritePost,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new AppError('You already saved this currency pair', 409));
    }
  }
});

exports.getFavoritePair = catchAsync(async (req, res, next) => {
  const favorite = await Favorite.find({ userId: req.user.id }).select('-__v');

  if (!favorite) {
    return next(new AppError('This user has no favorite currency pair', 404));
  }
  res.status(200).json({
    status: 'success',
    favorite,
  });
});

exports.getFavoritePairById = catchAsync(async (req, res, next) => {
  const favoriteId = req.params.id;
  const userFavoriteId = req.user.id;

  const userFavorite = await Favorite.findOne({
    _id: favoriteId,
    userId: userFavoriteId,
  });

  if (!userFavorite) {
    return next(new AppError('Data not found', 404));
  }

  res.status(200).json({
    status: 'success',
    userFavorite,
  });
});

exports.deleteFavouriteById = catchAsync(async (req, res, next) => {
  await Favorite.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
