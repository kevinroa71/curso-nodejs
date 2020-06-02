const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Files Upload
app.use(fileUpload({ useTempFiles: true }));

// ==============
//  Routes
// ==============
app.use(require('../routes/usuario'));
app.use(require('../routes/categoria'));
app.use(require('../routes/producto'));
app.use(require('../routes/upload'));
app.use(require('../routes/image'));

module.exports = app;
