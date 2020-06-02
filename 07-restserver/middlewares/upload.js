const _ = require('underscore');

module.exports = {
    verifyImage: (req, res, next) => {
        if (!req.files || !_.has(req.files, 'image'))
            return res.status(400).send({msg: 'No image were uploaded.'});

        const file = req.files.image;
        const mimes = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'];

        if (!_.contains(mimes, file.mimetype))
            return res.status(400).send({msg: `Los archivos ${file.mimetype} no son permitidos`});

        req.image = file;
        next();
    }
};
