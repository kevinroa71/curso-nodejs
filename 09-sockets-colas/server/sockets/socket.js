const { io } = require('../server');
const {TicketControl} = require('../class/TicketControl');

const ticket = new TicketControl();

io.on('connection', (client) => {
    client.emit('estadoactual', {
        actual: ticket.estadoActual(),
        atendiendo: ticket.estadoAtencion()
    });
    client.on('siguienteticket', function (data, callback) {
        callback(ticket.siguienteTicket());
    });
    client.on('atenderticket', function (data, callback) {
        callback(ticket.atenderTicket(data.escritorio));
        client.broadcast.emit('estadoactual', {
            actual: ticket.estadoActual(),
            atendiendo: ticket.estadoAtencion()
        });
    });
});