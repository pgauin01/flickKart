const Review = require('../modals/reviewModal');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.getOneReview = catchAsync(async (req, res, next) => {
  const doc = await Review.find({ user: req.params.id });
  if (!doc) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    total: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.updateOneReview = catchAsync(async (req, res, next) => {
  let doc = await Review.findById(req.params.id);

  if (doc.user._id == req.user.id) {
    doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } else {
    next(new AppError('you are not allowed to perform this action', 403));
  }
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findById(req.params.id);

  if (doc.user._id == req.user.id) {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    next(new AppError('you are not allowed to perform this action', 403));
  }
});

exports.getAllReview = catchAsync(async (req, res, next) => {
  const doc = await Review.find();
  res.status(200).json({
    status: 'success',
    total: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const doc = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
