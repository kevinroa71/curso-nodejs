var socket = io(),
    params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
};

socket.on('connect', function() {
    socket.emit('entrarChat', usuario);
});

socket.on('notificacion', function(mensaje) {
    alert(mensaje);
});

socket.on('usuariosconectados', function(usuarios) {
    console.log(usuarios);
});