// isAdmin middleware
const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
      // User is an admin, allow access to the next middleware or route handler
      next();
    } else {
      // User is not an admin, return unauthorized error
      res.status(403).json({ error: 'Unauthorized' });
    }
  };

  module.exports = {isAdmin};
  