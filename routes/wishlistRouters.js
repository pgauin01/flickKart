const express = require('express');
const {
  AddWishlist,
  getAllWish,
  getWish,
  deleteWish,
} = require('../controller/wishController');

const router = express.Router();

router.route('/').post(AddWishlist).get(getWish);
router.route('/:id').delete(deleteWish);
module.exports = router;
