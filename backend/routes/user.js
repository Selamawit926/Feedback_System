const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  changeStatus
} = require('../controllers/user');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/allUsers', getUsers);
router.put('/active/:id',changeStatus);

module.exports = router;