var socket = io();

// para escuchar eventos se usa el on
socket.on('connect', function () {
    console.log('conectado al servidor');
});
socket.on('disconnect', function () {
    console.log('se desconecto con el servidor');
});
socket.on('enviarmensaje', function (data) {
    console.log(data);
});

// parra enviar enventos se usa el emit
socket.emit('enviarmensaje', {
    msg: 'Mensaje del cliente'
}, function (resp) {
    console.log(resp);
});