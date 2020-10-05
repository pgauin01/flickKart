const mongoose = require('mongoose');

const orderScheama = new mongoose.Schema(
  {
    product: {
      type: [Object],
      // ref: 'Product',
      required: [true, 'A order must have products'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A order must belong to a user'],
    },
    total: {
      type: Number,
      required: [true, 'A order must have a total'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// orderScheama.pre(/^find/, function (next) {
//   this.populate('product');
//   next();
// });

// orderScheama.pre(/^find/, function (next) {});

const Order = mongoose.model('Order', orderScheama);

module.exports = Order;
