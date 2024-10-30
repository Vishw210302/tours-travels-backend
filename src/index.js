const express = require('express');
const mongoose = require('./db/db');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
const cron = require('node-cron');
const PORT = process.env.PORT || 3000;

// Require your routes and use them here
const apiRoute = require('./API/apiRoute/apiRoute')
const allRoute = require('../src/allRoute/allRoute');
const adminController = require('./adminController/adminController');
const apicontroller = require('../src/API/apiController/Controller.js');
const logger = require('morgan')

app.use(logger('dev'));
app.use('/api', apiRoute);
app.use('/admin', allRoute);

app.get('/login', adminController.loginPage);
app.post('/post-login', adminController.login);
app.get('/register', adminController.registerPage);
app.post('/register-post', adminController.registerApi);


// Schedule task to run every 24 hours (daily at midnight)
cron.schedule('0 0 * * *', () => {
  console.log('Running regenerateFlight every 24 hours');
  apicontroller.regenerateFlight();
});


app.get('*', function (req, res) {
  res.send(`<h1>${req.path.replace('/', '')} not found</h1>`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/login`);
});