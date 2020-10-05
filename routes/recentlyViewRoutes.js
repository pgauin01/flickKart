const express = require('express');
const {
  createRecentView,
  deleteRecentView,
  viewRecentView,
} = require('../controller/recentviewController');

const router = express.Router();

router.route('/').post(createRecentView);
router.route('/:id').get(viewRecentView).delete(deleteRecentView);

module.exports = router;
