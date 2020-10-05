const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'please provide a valid address'],
      minlength: 10,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'an address must have an user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

addressSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const address = mongoose.model('Address', addressSchema);

module.exports = address;
