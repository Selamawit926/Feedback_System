const path = require('path');
const express = require('express');
// const colors = require('colors');
const dotenv = require('dotenv').config();
// const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    // Set the Content-Security-Policy header to prevent RCE/LCE attacks
    res.set('Content-Security-Policy', "default-src 'self'");
    next();
  });
  

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