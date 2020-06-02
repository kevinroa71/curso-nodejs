const express = require('express');
const fs = require('fs');
const path = require('path');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const {verifyImage} = require('../middlewares/upload');
const app = express();

const subirImagen = async (file, record, namespace) => {
    const name = `${record._id}-${new Date().getTime()}-${file.name}`;
    const ruta = path.resolve(__dirname, `../uploads/${namespace}`);

    if (record.img && fs.existsSync(`${ruta}/${record.img}`)) {
        fs.unlinkSync(`${ruta}/${record.img}`);
    }

    await file.mv(`${ruta}/${name}`);
    change = await record.set({img: name}).save();

    return change;
};

app.put('/upload/usuario/:id', verifyImage, (req, res) => {
    Usuario.findById(req.params.id)
        .exec()
        .then(usuario => {
            if (!usuario)
                return res.status(404).send({msg: 'Usuario no encontrado'});

            subirImagen(req.image, usuario, 'usuario')
                .then(record => res.send({usuario: record, msg: 'File uploaded!'}))
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(400).send(err));
});

app.put('/upload/producto/:id', verifyImage, (req, res) => {
    Producto.findById(req.params.id)
        .exec()
        .then(producto => {
            if (!producto)
                return res.status(404).send({msg: 'Producto no encontrado'});

            subirImagen(req.image, producto, 'producto')
                .then(record => res.send({producto: record, msg: 'File uploaded!'}))
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(400).send(err));
});

module.exports = app;
