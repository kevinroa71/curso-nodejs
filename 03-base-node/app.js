const {argv} = require('./config/yargs');
const colors = require('colors/safe');
const mlp = require('./modules/multiplicar');

let command = argv._.pop();

switch (command) {
    case 'listar':
        mlp.generarTablaMultiplicar(argv.b, argv.l)
            .then(tabla => console.log(colors.yellow(tabla)))
            .catch(err => console.warn(colors.red(err)));
        break;
    case 'crear':
        mlp.crearArchivoTablaMultiplicar(argv.b, argv.l)
            .then(file => console.log(colors.green(`El archivo ${file} ha sido creado con exito`)))
            .catch(err => console.warn(colors.red(err)));
        break;

    default:
        break;
}
