const jwt = require('jsonwebtoken');

module.exports = {
    authentication: (req, res, next) => {
        const token = req.get('Authorization') || req.query.token;

        jwt.verify(token, process.env.JWT_SEED, (err, decoded) => {
            if (err)
                return res.status(401).send(err);

            req.usuario = decoded.data;
            next();
        });
    },
    verifyAdminRole: (req, res, next) => {
        const usuario = req.usuario;

        if (!usuario || usuario.role !== 'ADMIN_ROLE')
            return res.status(401).send({msg: 'No tienes las credenciales de administrador'});

        next();
    }
};
