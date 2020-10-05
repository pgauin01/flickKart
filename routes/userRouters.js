const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controller/userController');
const {
  signup,
  login,
  protect,
  restrictTo,
  logout,
  resetPassword,
  forgotPassword,

  updatePassword,
} = require('../controller/authController');

const wishlistRouter = require('./wishlistRouters');
const addressRouter = require('./addressRouters');
const cartRouter = require('./cartRouter');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.post('/logout', logout);

//protect all routes after this middleware
router.use(protect);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);
router.patch('/updateMyPassword', protect, updatePassword);

router.use('/wishlist', wishlistRouter);
router.use('/address', addressRouter);
router.use('/cart', cartRouter);

//only admin has access to this route
router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
