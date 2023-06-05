const express = require('express');
const router = express.Router();
const {
  addFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback
} = require('../controllers/feedback');

router.post('/addFeedback/:id', addFeedback);
router.get('/getFeedbacks/:id', getFeedbacks);
router.get('/getFeedback/:id', getFeedback);
router.put('/editFeedback/:id',updateFeedback);

module.exports = router;