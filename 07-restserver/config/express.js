const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// ==============
//  Routes
// ==============
app.use(require('../routes/usuario'));
app.use(require('../routes/categoria'));
app.use(require('../routes/producto'));

module.exports = app;
