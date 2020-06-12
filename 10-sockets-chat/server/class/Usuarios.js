const _ = require('underscore');

class Usuarios {
    constructor() {
        this.usuarios = [];
    }

    agregarUsuario(id, nombre, sala) {
        let usuario = {id, nombre, sala};
        this.usuarios.push(usuario);
        return usuario;
    }

    buscarUsuario(id) {
        let usuario = _.find(this.usuarios, (item) => item.id === id);
        return usuario;
    }

    borrarUsuario(id) {
        let usuario = this.buscarUsuario(id);
        this.usuarios = _.reject(this.usuarios, (item) => item.id === id);
        return usuario;
    }

    listaUsuarios() {
        return this.usuarios;
    }

    listaUsuariosPorSala(sala) {
        return _.filter(this.usuarios, (item) => item.sala == sala);
    }
}

module.exports = {
    Usuarios
};
