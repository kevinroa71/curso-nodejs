const express = require('express');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const {authentication, verifyAdminRole} = require('../middlewares/authentication');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app = express();

app.get('/usuario', authentication, (req, res) => {
    const limit = 10;
    const pagina = Number(req.query.page) || 1;
    const skip = (pagina*limit)-limit;
    const params = {};

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

app.post('/usuario', [authentication, verifyAdminRole], (req, res) => {
    let usuario = new Usuario(req.body);
    usuario.save()
        .then(record => {
            res.status(201).send(record);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.put('/usuario/:id', authentication, (req, res) => {
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

app.delete('/usuario/:id', [authentication, verifyAdminRole], (req, res) => {
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

app.post('/login', (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    Usuario.findOne({email})
        .exec()
        .then(usuario => {
            if (!usuario)
                return res.status(401).send({msg: 'Error de credenciales'});

            if (!bcrypt.compareSync(password, usuario.password))
                return res.status(401).send({msg: 'Error de credenciales'});

            const token = jwt.sign({
                data: usuario
            }, process.env.JWT_SEED, {
                expiresIn: process.env.JWT_EXPIRE
            });

            res.send({
                usuario,
                token
            });
        })
        .catch(err => res.status(500).send(err));
});


// Autenticacion con google
async function google_verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
    };
}

app.post('/google', (req, res) => {
    const token = req.body.idtoken;
    google_verify(token)
        .then(async (payload) => {
            let usuario = await Usuario.findOne({email: payload.email}).exec();
            if (!usuario) {
                usuario = new Usuario(payload);
                usuario.password = token;
                usuario = await usuario.save();
            }

            const mytoken = jwt.sign({
                data: usuario
            }, process.env.JWT_SEED, {
                expiresIn: process.env.JWT_EXPIRE
            });

            res.send({
                usuario,
                token: mytoken
            });
        })
        .catch(err => res.status(401).send(err));
});

module.exports = app;
