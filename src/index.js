const express = require('express');
const mongoose = require('./db/db');
const session = require('express-session');
const passport = require('passport');
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const logger = require('morgan')
const cron = require('node-cron');
const cookieParser = require('cookie-parser');

const debug = require('debug')('app:server');


require('./utils/passport.js');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(logger('dev'));

// app.use((req, res, next) => {
//   debug(`${req.method} ${req.url}`);
//   next();
// });

app.use(session({
  secret: process.env.secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Require your routes and use them here
const apiRoute = require('./API/apiRoute/apiRoute')
const allRoute = require('../src/allRoute/allRoute');
const apicontroller = require('../src/API/apiController/Controller.js');
const authRoute = require('./allRoute/authRoute.js')
const { isAuthenticated, isNotAuthenticated } = require('./middleware/authMiddleware.js')

const PORT = process.env.PORT || 3000;


app.use('/api', apiRoute);
app.use('/admin', isAuthenticated, allRoute);
app.use('/', authRoute)

// app.use((req, res, next) => {
//   if (!req.session.returnTo) {
//     return next();
//   }

//   const returnTo = req.session.returnTo;
//   delete req.session.returnTo;

//   if (req.isAuthenticated()) {
//     res.redirect(returnTo);
//   } else {
//     next();
//   }
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

cron.schedule('0 0 * * *', () => {
  console.log('Running regenerateFlight every 24 hours');
  apicontroller.regenerateFlight();
});


app.get('*', function (req, res) {
  res.send(`<h1>${req.path.replace('/', '')} not found</h1>`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});