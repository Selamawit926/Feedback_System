const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/checkAuth');
const csrfProtection = require("../middleware/csrfMiddleware");

const {
  addFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback
} = require('../controllers/feedback');

router.post('/addFeedback/:id', addFeedback);
router.get('/getFeedbacks/:id', csrfProtection, jwtAuth.verifyToken ,getFeedbacks);
router.get('/getFeedback/:id', getFeedback);
router.put('/editFeedback/:id',updateFeedback);

module.exports = router;