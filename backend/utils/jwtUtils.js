const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    // expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};


module.exports = {
  generateToken,
  generateRefreshToken,
};
