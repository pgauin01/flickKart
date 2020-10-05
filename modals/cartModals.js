const mongoose = require('mongoose');
const Product = require('./productModals');

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'A cart must have a product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A cart must have a user'],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    total: Number,
    sum: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'name price seller imageCover total',
  }).populate({
    path: 'user',
    select: 'name',
  });
  next();
});

// cartSchema.statics.calcTotalPrice = async function (userId) {
//   const stats = await this.aggregate([
//     {
//       $match: { user: userId },
//     },
//     {
//       $group: {
//         _id: '$user',
//         total: { $sum: '$total' },
//       },
//     },
//   ]);
//   console.log(stats[0].total);
// };

cartSchema.pre('save', async function () {
  const r = await Product.findById(this.product);
  this.total = r.price * this.quantity;
});

// cartSchema.post('save', function () {
//   this.sum = this.constructor.calcTotalPrice(this.user);
//   console.log(typeof this.user);
//   // console.log(this.sum);
// });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
