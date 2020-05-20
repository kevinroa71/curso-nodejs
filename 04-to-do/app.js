const argv = require('./config/yargs').argv;
const colors = require('colors/safe');
const todo = require('./src/to-do');

const command = argv._.pop();

switch (command) {
    case 'listar':
        const tareas = todo.listar();
        console.log(colors.green('============ Por Hacer ============'));
        tareas.forEach(tarea => {
            console.log(`Descripcion: ${colors.cyan(tarea.descripcion)}`);
            console.log(`Completado: ${colors.yellow(tarea.completado)}`);
            console.log(colors.green('==================================='));
        });
        break;
    case 'crear':
        console.log(todo.crear(argv.d));
        break;
    case 'actualizar':
        console.log(todo.actualizar(argv.d, argv.c));
        break;
    case 'eliminar':
        console.log(todo.eliminar(argv.d));
        break;

    default:
        break;
}
