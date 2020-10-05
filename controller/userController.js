const multer = require('multer');
const sharp = require('sharp');
const User = require('../modals/userModals');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image please upload only image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1 create error if user tried to update password

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('Sorry this path is not for updating password', 400)
    );
  }

  //2 filter unwanted fields
  const filterBody = filterObj(req.body, 'name', 'email');
  if (req.file) filterBody.photo = req.file.filename;

  //3 update user documents
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'Success',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const doc = await User.find();

  res.status(200).json({
    status: 'success',
    total: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.params.id).populate({ path: 'address' });

  // .populate({ path: 'wishlist' })
  //   .populate({ path: 'recentViewed' })
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(203).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  return res.status(500).json({
    status: 'error',
    message: 'Route not found Please use /signup to create new user',
  });
};
