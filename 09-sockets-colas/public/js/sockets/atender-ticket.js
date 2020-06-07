var querys = new URLSearchParams(window.location.search);
if (!querys.has('escritorio')) {
    window.location = 'index.html';
    throw new Error();
}

var escritorio = querys.get('escritorio');
var socket = io();

$('h1').text('Escritorio '+escritorio);

$('button').on('click', function () {
    socket.emit('atenderticket', {escritorio: escritorio}, function (data) {
        if (data.numero) {
            $('small').text(data.numero);
        } else {
            alert(data);
        }
    });
});