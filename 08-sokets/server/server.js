const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
module.exports = socketio(server);
require('./sockets/socket');

app.use(express.static(publicPath));


server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});