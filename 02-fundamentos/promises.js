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



let getEmpleadoById = (id) => new Promise((resolve, reject) => {
    let empleado = empleados.find((empleado) => id === empleado.id);
    if (!empleado) {
        reject(`Empleado con id: ${id} no existe`);
    } else {
        resolve(empleado);
    }
});

let getSalarioByEmpleado = (empleado) => new Promise((resolve, reject) => {
    let salario = salarios.find((salario) => salario.id === empleado.id);
    if (!salario) {
        reject(`No se encontro un salario para ${empleado.nombre}`);
    } else {
        resolve({
            id: empleado.id,
            nombre: empleado.nombre,
            salario: salario.monto
        });
    }
});


getEmpleadoById(4)
    .then( empleado => getSalarioByEmpleado(empleado) )
    .then( salario => console.log('Empleado :>> ', salario) )
    .catch( err => console.warn(err) );
