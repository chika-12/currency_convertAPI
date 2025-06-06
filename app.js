const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const currencyRouter = require('./routes/conversionRoute');
const favoriteRoute = require('./routes/favoriteRoute');

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/rates', currencyRouter);
app.use('/api/v1/favorite', favoriteRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`${req.originalUrl} is not found on this server`, 404)
  );
  next();
});

app.use(errorController);
module.exports = app;
