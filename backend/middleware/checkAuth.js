const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils');
const session = require('express-session');


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    const accessToken = token.split(" ");
    // console.log(accessToken)
    const decoded = jwt.verify(accessToken[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Access token has expired, handle accordingly
      res.status(401).json({ message: 'Access token expired' });
    } else {
      res.status(401).json({ message: error.message });
    }
  }
};

const refreshAccessToken = async (req,res) => {
    try {
        const refreshToken = req.session.refreshToken;
        const refresh_secret = process.env.JWT_REFRESH_SECRET;
        const verifiedToken = await jwt.verify(refreshToken, refresh_secret);
        if (!verifiedToken) {
            return res.status(401).json({message: "Authorization denied!"});
        }

        const access_token = jwtUtils.generateToken(verifiedToken.userId);
        req.session.accessToken = access_token;
        return res.status(200).json({token: access_token});

    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

module.exports = {verifyToken, refreshAccessToken};
