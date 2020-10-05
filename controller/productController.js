const multer = require('multer');
const sharp = require('sharp');
const Product = require('../modals/productModals');
const APIFeatures = require('../util/apiFeatures');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image file please upload image only', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  //coverImages
  req.body.imageCover = `product-${
    req.params.id || req.body.name
  }-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/product/${req.body.imageCover}`);

  //2 images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${
        req.params.id || req.body.name
      }-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/product/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.createOne = catchAsync(async (req, res, next) => {
  const doc = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Product.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No documents found with this id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

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

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Product.findById(req.params.id).populate({
    path: 'reviews',
  });
  if (!doc) {
    return next(new AppError('No document found with this id', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      data: doc,
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let filter = {};

  const features = new APIFeatures(Product.find(filter), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: {
      data: doc,
    },
  });
});
