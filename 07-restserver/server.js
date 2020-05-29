require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));


mongoose.connect('mongodb://localhost/cursonode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Conexion a la base de datos');
}).catch(console.warn);

app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando por el puerto", process.env.PORT);
});
