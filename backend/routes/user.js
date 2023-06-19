const express = require('express');
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
// const sanitizeMiddleware = require("../middleware/sanitizeMiddleware");
const {
  register,
  login,
  getUsers,
  changeStatus,
  verifyEmail,
  verifyOTP,
  forgotPassword,
  changePassword,
  resetPassword
} = require('../controllers/user');

router.post('/', register);
router.post('/login', login);
router.get('/verify-email/:id/:otp',verifyEmail);
router.post('/verify-otp/:id',verifyOTP);
router.post('/forgotPassword',forgotPassword);
router.put('/changePassword/:id',changePassword);
router.put('/resetPassword/:id',resetPassword);
router.get('/allUsers',getUsers);
router.put('/active/:id',changeStatus);


module.exports = router;