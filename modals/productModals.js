const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      minlength: [
        5,
        'A product name must have more than or equals to 10 character',
      ],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A product price must a price'],
    },
    color: [String],
    seller: {
      type: String,
      required: [true, 'A product must have a seller'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    highlights: [String],
    imageCover: {
      type: String,
      required: [true, 'A product must have a coverImage'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    description: {
      type: [Object],
    },
    specifications: [Object],
    tags: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ slug: 1 });

//virtual populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});
//Document middleware runs before .save() .create()
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
