let empleados = [{
    id: 1,
    nombre: 'Kevin'
},{
    id: 2,
    nombre: 'Sindy'
},{
    id: 3,
    nombre: 'Jose'
}];

let salarios = [{
    id: 1,
    monto: 3000.0
},{
    id: 2,
    monto: 1340.57
}];


let getEmpleadoById = (id, callback) => {
    let empleado = empleados.find((empleado) => id === empleado.id);

    if (!empleado) {
        callback(`Empleado con id: ${id} no existe`);
    } else {
        callback(null, empleado);
    }
};

let getSalarioByEmpleado = (empleado, callback) => {
    let salario = salarios.find((salario) => salario.id === empleado.id);

    if (!salario) {
        callback(`No se encontro un salario para ${empleado.nombre}`);
    } else {
        callback(null, {
            id: empleado.id,
            nombre: empleado.nombre,
            salario: salario.monto
        });
    }
};

getEmpleadoById(4, (err, empleado) => {
    if (err) {
        console.warn(err);
    } else {
        getSalarioByEmpleado(empleado, (err, salario) => {
            if (err) {
                console.warn(err);
            } else {
                console.log('Empleado :>> ', salario);
            }
        });
    }
});