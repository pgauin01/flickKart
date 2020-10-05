const mongoose = require('mongoose');

const recentlyviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'a recentlyviewed product must have a product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'a recentlyviewed product must belong to a user'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

recentlyviewSchema.index({ product: 1, user: 1 }, { unique: true });

recentlyviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'name',
  });
  next();
});

const recentlyView = mongoose.model('RecentView', recentlyviewSchema);
module.exports = recentlyView;
