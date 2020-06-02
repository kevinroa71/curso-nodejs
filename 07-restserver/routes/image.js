const express = require('express');
const fs = require('fs');
const path = require('path');
const {authentication} = require('../middlewares/authentication');
const app = express();


app.get('/image/:namespace/:img', authentication, (req, res) => {
    const img  = req.params.img;
    const ns   = req.params.namespace;
    const ruta = path.resolve(__dirname, `../uploads/${ns}`);
    const file = `${ruta}/${img}`;

    if (!fs.existsSync(file))
        return res.status(404).send({msg: 'Imagen no encontrada'});

    res.sendFile(file);
});


module.exports = app;
