const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

app.use(express.json());
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`${req.originalUrl} is not found on this server`, 404)
  );
  next();
});

app.use(errorController);
module.exports = app;
