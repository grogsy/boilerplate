const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Path to folder containing static files
const staticFolder = path.join(__dirname, '../public');

// Static file(index.html, style.css, etc.) Middleware
app.use(express.static(staticFolder));

// Request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing middleware
app.use('/api', require('./api'));

// Send index.html for any requests that don't match express-defined(like /api) routes
app.get('*', (req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html'));
});

// 500 Error Handler, must be the very last defined middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);

  res
    .status(err.status || 500)
    .send(err.message || 'Something went wrong but I wont say');
});

const port = 3000;
// Fire up express server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
