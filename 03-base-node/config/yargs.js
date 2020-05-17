const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
};
const argv = require('yargs')
    .command('listar', 'Muestra en pantalla la tabla de multiplicar', opts)
    .command('crear', 'Crea un archivo en la ruta ./tablas que contiene la tabla de multiplicar', opts)
    .help()
    .argv;

module.exports = {
    argv
};
