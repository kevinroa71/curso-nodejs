var socket = io();
var label = $("#lblNuevoTicket");

socket.on('estadoactual', function (data) {
    label.text(data.actual);
});

$('button').on('click', function () {
    socket.emit('siguienteticket', null, function (data) {
        label.text(data);
    });
});