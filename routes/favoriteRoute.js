const express = require('express');
const favoriteRoute = express.Router();
const favoriteController = require('../controllers/favorite');
const authentication = require('../controllers/authentication');

favoriteRoute.use(authentication.protect);
favoriteRoute
  .route('/')
  .post(favoriteController.postFavorite)
  .get(favoriteController.getFavoritePair);

favoriteRoute
  .route('/:id')
  .get(favoriteController.getFavoritePairById)
  .delete(favoriteController.deleteFavouriteById);
module.exports = favoriteRoute;
