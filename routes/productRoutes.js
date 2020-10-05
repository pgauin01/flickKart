const express = require('express');

const {
  getAllProducts,
  createOne,
  deleteOne,
  updateOne,
  getOne,
  uploadProductImage,
  resizeProductImages,
} = require('../controller/productController');

const { protect, restrictTo } = require('../controller/authController');

const recentlyViewRoute = require('./recentlyViewRoutes');

const router = express.Router();

router.use('/recentlyView', recentlyViewRoute);

router
  .route('/')
  .get(getAllProducts)
  .post(
    protect,
    restrictTo('admin'),
    uploadProductImage,
    resizeProductImages,
    createOne
  );
router
  .route('/:id')
  .get(getOne)
  .delete(protect, restrictTo('admin'), deleteOne)
  .patch(
    protect,
    restrictTo('admin'),
    uploadProductImage,
    resizeProductImages,
    updateOne
  );

module.exports = router;
