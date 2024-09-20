const express = require('express');
const mongoose = require('./db/db');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path')
const cors = require('cors');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); 
const PORT = process.env.PORT || 3000;

// Require your routes and use them here
const apiRoute = require('./API/apiRoute/apiRoute')
const allRoute = require('../src/allRoute/allRoute');
const adminController = require('./adminController/adminController');
app.use('/api', apiRoute);
app.use('/admin', allRoute);

app.get('/', adminController.loginPage);
app.post('/post-login', adminController.login);
app.get('/register', adminController.registerPage);
app.post('/register-post', adminController.registerApi);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});