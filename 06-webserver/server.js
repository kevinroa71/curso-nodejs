const express = require('express');
const hbs = require('hbs');
require('./config/helpers');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

app.get('/', (req, res) => {
    res.render('home', {
        title: 'hellO worLd!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/json', (req, res) => {
    res.send({
        url: req.url,
        msg: 'Hola Mundo'
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando por el puerto ${port}`);
});
