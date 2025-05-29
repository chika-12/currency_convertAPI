const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');

const http = process.env.ADDRESS.replace('<API_KEY>', process.env.API_KEY);

const loopThroughCurrency = (base, target, quotes) => {
  const currencyKey = base + target;
  const filteredRates = {};

  for (date in quotes) {
    const rate = quotes[date][currencyKey];
    const wholeRate = Math.round(rate);
    if (rate) {
      filteredRates[date] = wholeRate;
    }
  }

  return filteredRates;
};

exports.getExchangeRate = catchAsync(async (req, res, next) => {
  const base = req.query.base?.toUpperCase() || 'USD';
  const target = req.query.target?.toUpperCase() || 'NGN';

  try {
    const response = await axios.get(`${http}/latest/${base}`);
    const rate = response.data.conversion_rates[target];
    if (!rate) {
      return next(new AppError(`Currency ${target} not found`, 404));
    }
    res.status(200).json({
      base,
      target,
      rate,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(`Currency ${target} or ${base} not found`, 404));
  }
});

exports.reverseExchange = catchAsync(async (req, res, next) => {
  const base = req.query.base?.toUpperCase() || 'USD';
  const target = req.query.target?.toUpperCase() || 'NGN';

  try {
    const response = await axios.get(`${http}/latest/${target}`);
    const rate = response.data.conversion_rates[base];
    if (!rate) {
      return next(new AppError(`Currency ${target} not found`, 404));
    }
    res.status(200).json({
      base,
      target,
      rate,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(`Currency ${target} or ${base} not found`, 404));
  }
});

exports.historicalExchange = catchAsync(async (req, res, next) => {
  const base = req.query.base?.toUpperCase() || 'USD';
  const target = req.query.target?.toUpperCase() || 'NGN';
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;

  if (!start_date || !end_date) {
    return next(
      new AppError(
        'Please provide both start_date and end_date in YYYY-MM-DD format.',
        400
      )
    );
  }

  const url = `${process.env.BASE_URL}?start_date=${start_date}&end_date=${end_date}&base=${base}&symbols=${target}&access_key=${process.env.API_KEY2}`;

  try {
    const response = await axios.get(url);
    const quotes = response.data.quotes;

    if (!quotes || Object.keys(quotes).length === 0) {
      return next(
        new AppError(
          'No exchange rate data found for the specified parameters.',
          404
        )
      );
    }

    const filteredRates = loopThroughCurrency(base, target, quotes);

    res.status(200).json({
      status: 'success',
      base,
      target,
      start_date,
      end_date,
      filteredRates,
    });
  } catch (err) {
    console.error('Error fetching exchange rates:', err.message);
    return next(
      new AppError(
        'Failed to fetch exchange rate data. Please try again later.',
        500
      )
    );
  }
});
