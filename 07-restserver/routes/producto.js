const express = require('express');
const _ = require('underscore');
const Producto = require('../models/producto');
const {authentication} = require('../middlewares/authentication');
const app = express();

app.post('/producto', authentication, (req, res) => {
    let producto = new Producto(req.body);
    producto.usuario = req.usuario._id;
    producto.save()
        .then(record => res.status(201).send(record))
        .catch(err => res.status(400).send(err));
});

app.put('/producto/:id', authentication, (req, res) => {
    Producto.findById(req.params.id)
        .exec()
        .then(producto => {
            if (!producto) return res.status(404).send({msg: "producto no encontrado"});

            const params = _.omit(req.body, ['usuario']);
            producto.set(params)
                .save()
                .then(record => res.send(record));
        })
        .catch(err => res.status(400).send(err));
});

app.get('/producto', authentication, (req, res) => {
    const limit = 10;
    const pagina = Number(req.query.page) || 1;
    const skip = (pagina*limit)-limit;
    const params = {};

    Producto.countDocuments(params, (err, count) => {
        if (err) return res.status(400).send(err);

        Producto.find(params)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'nombre')
            .sort('nombre')
            .limit(limit)
            .skip(skip)
            .exec()
            .then(productos => res.send({productos, count}))
            .catch(err => res.status(400).send(err));
    });
});

app.get('/producto/:id', authentication, (req, res) => {
    Producto.findById(req.params.id)
        .populate('usuario')
        .populate('categoria')
        .exec()
        .then(producto => {
            if (!producto) return res.status(404).send({msg: "producto no encontrado"});
            res.send(producto);
        })
        .catch(err => res.status(400).send(err));
});

app.delete('/producto/:id', authentication, (req, res) => {
    Producto.findById(req.params.id)
        .exec()
        .then(producto => {
            if (!producto) return res.status(404).send({msg: "producto no encontrado"});

            producto.set({disponible: false})
                .save()
                .then(del => res.send(del));
        })
        .catch(err => res.status(400).send(err));
});

app.get('/producto/search/:search', authentication, (req, res) => {
    Producto.find({nombre: new RegExp(req.params.search, 'i')})
        .exec()
        .then(productos => res.send(productos))
        .catch(err => res.status(400).send(err));
});

module.exports = app;
