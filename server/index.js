const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

// The app's database
const { db } = require('./db');

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

// configure & create database store for session persistence
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so session table is created
dbStore.sync();

// Session handling middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret here',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routing middleware
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

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
// Sync database, then Fire up express server. Remember to create db & change db name
// in db.js, otherwise this will not work!
db.sync().then(function() {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
