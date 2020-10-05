const express = require('express');
const authController = require('../controller/authController');

const {
  createReview,
  getAllReview,
  getOneReview,
  deleteReview,
  updateOneReview,
} = require('../controller/reviewController');

const router = express.Router();

router.route('/').get(getAllReview).post(createReview);
router
  .route('/:id')
  .get(getOneReview)
  .patch(authController.protect, updateOneReview)
  .delete(authController.protect, deleteReview);

module.exports = router;
