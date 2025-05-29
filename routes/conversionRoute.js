const express = require('express');
const currencyRouter = express.Router();
const conversionRate = require('../controllers/currencyControllers');
const authentication = require('../controllers/authentication');

currencyRouter.use(authentication.protect);
currencyRouter.route('/convert').get(conversionRate.getExchangeRate);
currencyRouter.route('/reverse').get(conversionRate.reverseExchange);
currencyRouter.route('/history').get(conversionRate.historicalExchange);

module.exports = currencyRouter;
