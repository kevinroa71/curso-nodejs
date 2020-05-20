const fs = require('fs');

let tareas = [];

const guardarDB = () => {
    let data = JSON.stringify(tareas);
    fs.writeFileSync('./db/to-do.json', data);
};

const cargarDB = () => {
    try {
        tareas = require('../db/to-do.json');
    } catch (error) {
        tareas = [];
    }
};

module.exports = {
    crear: (descripcion) => {
        let tarea = {
            descripcion,
            completado: false
        };
        cargarDB();
        tareas.push(tarea);
        guardarDB();
        return tarea;
    },
    listar: () => {
        cargarDB();
        return tareas;
    },
    actualizar: (descripcion, completado = true) => {
        cargarDB();
        let index = tareas.findIndex(tarea => descripcion.toUpperCase() === tarea.descripcion.toUpperCase());

        if (index < 0) throw new Error("No se encontro ninguna tarea para actualizar");

        tareas[index].completado = completado;
        guardarDB();
        return tareas[index];
    },
    eliminar: (descripcion) => {
        cargarDB();
        let newTareas = tareas.filter(tarea => descripcion.toUpperCase() !== tarea.descripcion.toUpperCase());
        if (newTareas.length === tareas.length) throw new Error("No se encontro ninguna tarea para borrar");
        tareas = newTareas;
        guardarDB();
        return true;
    }
};
