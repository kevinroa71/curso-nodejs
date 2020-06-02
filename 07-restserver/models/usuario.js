const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: String,
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['USER_ROLE', 'ADMIN_ROLE'],
            message: '{VALUE} no es un rol valido'
        }
    },
    estado: {
        type: Boolean,
        default: true
    },
    google:  {
        type: Boolean,
        default: false
    }
});

Usuario.plugin(uniqueValidator, {message:'El {PATH} debe ser unico'});
Usuario.post('validate', function(doc) {
    if (doc.isModified('password')) {
        doc.password = bcrypt.hashSync(doc.password, 10);
    }
});
Usuario.methods.toJSON = function () {
    let objet = this.toObject();
    delete objet.password;
    return objet;
};

module.exports = mongoose.model('Usuario', Usuario);
