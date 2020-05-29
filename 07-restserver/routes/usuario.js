const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', (req, res) => {
    const limit = 10;
    const pagina = Number(req.query.page) || 1;
    const skip = (pagina*limit)-limit;
    const params = {estado: true};

    Usuario.countDocuments(params, (err, count) => {
        if (err) return res.status(400).send(err);

        Usuario.find(params, 'nombre email role estado')
            .limit(limit)
            .skip(skip)
            .exec()
            .then(usuarios => res.send({usuarios, count}))
            .catch(err => res.status(400).send(err));
    });
});

app.post('/usuario', (req, res) => {
    let usuario = new Usuario(req.body);
    usuario.save()
        .then(record => {
            res.status(201).send(record);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.put('/usuario/:id', (req, res) => {
    Usuario.findById(req.params.id)
        .exec()
        .then(usuario => {
            if (!usuario) return res.status(404).send({msg: "Usuario no encontrado"});

            const params = _.omit(req.body, ['google', 'password', 'estado']);
            usuario.set(params)
                .save()
                .then(record => res.send(record))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
});

app.delete('/usuario/:id', (req, res) => {
    Usuario.findById(req.params.id)
        .exec()
        .then(usuario => {
            if (!usuario) return res.status(404).send({msg: "Usuario no encontrado"});

            usuario.set({estado: false})
                .save()
                .then(del => res.send(del))
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
});

module.exports = app;
