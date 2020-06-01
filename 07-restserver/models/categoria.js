const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Categoria', Categoria);
