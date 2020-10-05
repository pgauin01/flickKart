/* eslint-disable */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../modals/cartModals');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const Booking = require('../modals/orderModal');
const Order = require('../modals/orderModal');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Getting cart Items
  const doc = await Cart.find({ user: req.params.userId });
  console.log(doc);
  //   console.log(doc);

  const products = [];
  let productItem = {};
  doc.forEach((el) => {
    productItem.name = el.product.name;
    productItem.description = el.product.seller;
    productItem.amount = el.product.price * 100;
    productItem.currency = 'inr';
    productItem.quantity = el.quantity;

    products.push(productItem);
    productItem = {};
  });
  // creating checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/`,
    success_url: `http://localhost:3001/user/orders`,
    cancel_url: `http://localhost:3001/user/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.userId,
    line_items: products,
  });

  if (session.success_url) {
    let newObject = [];
    let price = [];
    let obj = {};

    for (let key in doc) {
      obj.id = doc[key].product._id;
      obj.name = doc[key].product.name;
      obj.price = doc[key].product.price;
      obj.seller = doc[key].product.seller;
      obj.imageCover = doc[key].product.imageCover;
      obj.quantity = doc[key].quantity;

      newObject.push(obj);
      obj = {};

      // newObject.push(doc[key].product);
      price.push(doc[key].total);
    }

    price = price.reduce((cumm, curr) => cumm + curr, 0);

    await Booking.create({
      product: newObject,
      user: req.user.id,
      total: price,
    });

    await Cart.deleteMany({ user: req.user.id });
  }

  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.getBooking = async (req, res, next) => {
  const doc = await Order.find({ user: req.user.id });
  // console.log(req.user.id);
  // console.log(doc.length);
  if (doc.length === 0) {
    return next(new AppError('no doc found in cart', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};
