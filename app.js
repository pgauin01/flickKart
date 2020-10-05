const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRouters');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const AppError = require('./util/appError');
const gloablErrorhandler = require('./controller/errorController');

const app = express();

app.enable('trust proxy');

//implement cors

app.use(cors());
app.options('*', cors());

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

//set security http headers
app.use(helmet());

//development logging

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit request from api
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request please try again in 1 hour',
});

app.use('/api', limiter);

//body parser , reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

//Data sanatization againt noSQL query injection

app.use(mongoSanitize());

//Data sanatization against xss

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'ratingsAverage',
      'ratingsQuantity',
      'tags',
      'color',
      'price',
      'seller',
    ],
  })
);

app.use(compression());

//Routes

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

//changing path to /api/v1/users/wishlist
// app.use('/api/v1/users/wishlist', wishlistRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`cant't find ${req.originalUrl} on this server!!`, 404));
});

app.use(gloablErrorhandler);

module.exports = app;
