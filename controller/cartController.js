const Cart = require('../modals/cartModals');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.addCart = catchAsync(async (req, res, next) => {
  const doc = await Cart.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.showCart = catchAsync(async (req, res, next) => {
  const doc = await Cart.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    total: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const stats = await Cart.aggregate([
    {
      $match: { user: req.user._id },
    },
    {
      $group: {
        _id: '$user',
        total: { $sum: '$total' },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    sum: stats,
  });
});

exports.updateQuantity = catchAsync(async (req, res, next) => {
  const doc = await Cart.findById(req.params.id);

  doc.quantity = req.body.quantity;
  doc.total = req.body.quantity * doc.product.price;
  doc.save({ validateBeforeSave: false });

  if (!doc) {
    return next(new AppError('No documents found with this id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
