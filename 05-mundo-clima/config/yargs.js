const argv = require('yargs')
    .options({
        direccion: {
            demand: true,
            alias: 'd',
            type: 'string',
            desc: 'Direccion del sitio'
        }
    })
    .argv;

module.exports = {
    argv
};
