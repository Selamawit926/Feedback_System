// csrfMiddleware.js

const csrf = require("csurf");

// Create CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

module.exports = csrfProtection;
