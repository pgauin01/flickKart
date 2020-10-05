const Wish = require('../modals/wishlistModals');
const catchAsync = require('../util/catchAsync');

exports.AddWishlist = catchAsync(async (req, res, next) => {
  const doc = await Wish.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAllWish = catchAsync(async (req, res, next) => {
  const doc = await Wish.find();

  res.status(200).json({
    status: 'success',
    total: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getWish = catchAsync(async (req, res, next) => {
  const doc = await Wish.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    total: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.deleteWish = catchAsync(async (req, res, next) => {
  await Wish.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
