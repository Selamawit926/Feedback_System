const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/checkAuth');
const csrfProtection = require("../middleware/csrfMiddleware");

const {
  addFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  upload,
  checkPdf
} = require('../controllers/feedback');

router.post('/addFeedback/:id', addFeedback);
router.get('/getFeedbacks/:id', csrfProtection, jwtAuth.verifyToken ,getFeedbacks);
router.get('/getFeedback/:id', getFeedback);
router.put('/editFeedback/:id',updateFeedback);
  
  // Define the file upload route
  router.put('/upload', upload.single('file'), checkPdf, (req, res) => {
    // Access the uploaded file details
    const { filename, path } = req.file;
  
    // Perform additional operations as needed, such as saving the file details to a database
  
    // Send a response indicating the successful upload
    res.json({ filename, path });
  });

module.exports = router;