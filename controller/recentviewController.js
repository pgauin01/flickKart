const RecentView = require('../modals/recentlyviewModals');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.createRecentView = catchAsync(async (req, res, next) => {
  const doc = await RecentView.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.viewRecentView = catchAsync(async (req, res, next) => {
  const doc = await RecentView.find({ user: req.params.id });

  if (doc.length < 1) {
    return next(new AppError('no Doc found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteRecentView = catchAsync(async (req, res, next) => {
  await RecentView.deleteMany({ user: req.params.id });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
