const { io } = require('../server');
const {Usuarios} = require('../class/Usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat', (data) => {
        let usuario = usuarios.agregarUsuario(client.id, data.nombre, data.sala, data.img);
        let lista = usuarios.listaUsuariosPorSala(usuario.sala);

        client.join(usuario.sala);
        client.emit('usuariosconectados', lista);
        client.broadcast
            .to(usuario.sala)
            .emit('notificacion', `${usuario.nombre} acaba de ingresar al chat`);
        client.broadcast
            .to(usuario.sala)
            .emit('usuariosconectados', lista);
    });

    client.on('disconnect', () => {
        let usuario = usuarios.borrarUsuario(client.id);
        let lista = usuarios.listaUsuariosPorSala(usuario.sala);

        client.broadcast
            .to(usuario.sala)
            .emit('notificacion', `${usuario.nombre} salio del chat`);
        client.broadcast
            .to(usuario.sala)
            .emit('usuariosconectados', lista);
    });

    client.on('mensaje', (mensaje, callback) => {
        let usuario = usuarios.buscarUsuario(client.id);
        client.broadcast
            .to(usuario.sala)
            .emit('mensaje', {
                usuario,
                mensaje
            });
        callback();
    });

    client.on('mensajePrivado', (data) => {
        let usuario = usuarios.buscarUsuario(client.id);
        client.broadcast.to(data.id).emit('notificacion', `${usuario.nombre} dice: ${data.mensaje}`);
    });
});