const io = require('../server');

io.on('connection', (client) => {
    console.log('conectado con el cliente');
    client.on('disconnect', function () {
        console.log('el cliente se desconecto');
    });
    client.on('enviarmensaje', (data, callback) => {
        console.log(data);
        if (data.msg)
            callback({msg: 'Trae el mensaje'});
        else
            callback({msg: 'No trae el mensaje'});

        // Propagar el evento a todos los usuarios conectados
        client.broadcast.emit('enviarmensaje', data);
    });
    client.emit('enviarmensaje', {
        msg: 'mensaje del servidor'
    });
});