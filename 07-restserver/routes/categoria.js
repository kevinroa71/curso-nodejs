const express = require('express');
const _ = require('underscore');
const Categoria = require('../models/categoria');
const {authentication, verifyAdminRole} = require('../middlewares/authentication');
const app = express();

app.get('/categoria', authentication, (req, res) => {
    const limit = 10;
    const pagina = Number(req.query.page) || 1;
    const skip = (pagina*limit)-limit;
    const params = {};

    Categoria.countDocuments(params, (err, count) => {
        if (err) return res.status(400).send(err);

        Categoria.find(params, 'nombre')
            .populate('usuario', 'nombre email')
            .sort('-nombre')
            .limit(limit)
            .skip(skip)
            .exec()
            .then(categorias => res.send({categorias, count}))
            .catch(err => res.status(400).send(err));
    });
});

app.get('/categoria/:id', authentication, (req, res) => {
    Categoria.findById(req.params.id)
        .populate('usuario')
        .exec()
        .then(categoria => {
            if (!categoria) return res.status(404).send({msg: "Categoria no encontrada"});
            res.send(categoria);
        })
        .catch(err => res.status(400).send(err));
});

app.post('/categoria', authentication, (req, res) => {
    let categoria = new Categoria(req.body);
    categoria.usuario = req.usuario._id;
    categoria.save()
        .then(record => res.status(201).send(record))
        .catch(err => res.status(400).send(err));
});

app.put('/categoria/:id', authentication, (req, res) => {
    Categoria.findById(req.params.id)
        .exec()
        .then(categoria => {
            if (!categoria) return res.status(404).send({msg: "Categoria no encontrada"});

            const params = _.omit(req.body, ['usuario']);
            categoria.set(params)
                .save()
                .then(record => res.send(record));
        })
        .catch(err => res.status(400).send(err));
});

app.delete('/categoria/:id', [authentication, verifyAdminRole], (req, res) => {
    Categoria.findById(req.params.id)
        .exec()
        .then(categoria => {
            if (!categoria) return res.status(404).send({msg: "Categoria no encontrada"});

            categoria.remove()
                .then(del => res.send(del))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
});

module.exports = app;
