const descripcion = {
    demand: true,
    alias: 'd',
    type: 'string',
    desc: 'La descripcion de la tarea por hacer'
};

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('eliminar', 'Elimina una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza una tarea por hacer', {
        descripcion,
        completado: {
            alias: 'c',
            default: true,
            type: 'boolean',
            desc: '(true/false) Para indicar si la tarea se completo'
        }
    })
    .command('listar', 'Muestra todas las tareas por hacer')
    .help()
    .argv;

module.exports = {
    argv
};
