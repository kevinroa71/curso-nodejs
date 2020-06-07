var socket = io();
// var label = $("#lblNuevoTicket");

socket.on('estadoactual', function (data) {
    var index = 1;
    data.atendiendo.forEach(function (item) {
        var escritorio = $('#lblEscritorio'+index);
        if (escritorio) {
            escritorio.text('Escritorio '+item.escritorio);
            $('#lblTicket'+index).text('Ticket '+item.numero);
        }
        index++;
    });
    var myaudio = new Audio('/audio/new-ticket.mp3');
    myaudio.addEventListener("canplaythrough", event => {
        myaudio.play();
    });
});
