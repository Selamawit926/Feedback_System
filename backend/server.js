const path = require('path');
const express = require('express');
// const colors = require('colors');
const dotenv = require('dotenv').config();
// const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
// const sanitizeMiddleware = require('./middleware/sanitizeMiddleware');
// Import the CSRF middleware
const csrfProtection = require("./middleware/csrfMiddleware");
const port = 5000;
const app = express();

const session = require('express-session');
// Set up session middleware
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000, // Session expiration time (1 hour)
    },
  })
);
// app.use(sessionConfig);

connectDB();


// Apply input sanitization middleware for all routes
// app.use(sanitizeMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    // Set the Content-Security-Policy header to prevent RCE/LCE attacks
    res.setHeader('Content-Security-Policy', "default-src 'self', 'sandbox allow-same-origin' ");
    next();
  });
// Apply CSRF protection middleware to relevant routes
app.use(csrfProtection);
app.use('/api/user', require('./routes/user'));
app.use('/api/feedback', require('./routes/feedback'));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

// app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));