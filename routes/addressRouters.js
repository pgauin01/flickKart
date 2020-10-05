const express = require('express');

const router = express.Router();
const { protect } = require('../controller/authController');

const {
  createAddress,
  deleteAddress,
  updateAddress,
} = require('../controller/addressController');

router.route('/').post(protect, createAddress);
router.delete('/:id', protect, deleteAddress);
router.patch('/:id', protect, updateAddress);

module.exports = router;
