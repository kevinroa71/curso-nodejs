require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(require('./config/express'));
app.use(express.static(path.resolve(__dirname, './public')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Conexion a la base de datos');
}).catch(console.warn);

app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando por el puerto", process.env.PORT);
});
