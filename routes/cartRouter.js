const express = require('express');

const {
  addCart,
  showCart,
  updateQuantity,
  deleteCart,
  getOne,
} = require('../controller/cartController');

const router = express.Router();

router.route('/').post(addCart).get(showCart);
router.route('/total').get(getOne);
router.route('/:id').post(updateQuantity).delete(deleteCart);

module.exports = router;
