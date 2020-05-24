const http = require('http');

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({
        nombre: 'Kevin',
        url: req.url
    }));
    res.end();
}).listen(8080);

console.log("Servidor escuchando por el puerto 8080");