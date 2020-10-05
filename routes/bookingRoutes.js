const express = require('express');
const { protect } = require('../controller/authController');
const bookingController = require('../controller/bookingController');

const router = express.Router();

router.get(
  '/checkout-session/:userId',
  protect,
  bookingController.getCheckoutSession
);

router.get('/orders', protect, bookingController.getBooking);

module.exports = router;
