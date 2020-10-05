const Address = require('../modals/addressModals');
const catchAsync = require('../util/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createAddress = catchAsync(async (req, res, next) => {
  const doc = await Address.create(req.body);

  res.status(201).json({
    data: {
      data: doc,
    },
  });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
  await Address.findByIdAndDelete(req.params.id);

  res.status(204).json({
    data: null,
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'address');
  const doc = await Address.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'Success',
    data: {
      user: doc,
    },
  });
});
