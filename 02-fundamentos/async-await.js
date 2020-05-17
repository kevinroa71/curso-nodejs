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



let getEmpleadoById = async (id) => {
    let empleado = empleados.find((empleado) => id === empleado.id);

    if (!empleado) {
        throw new Error(`Empleado con id: ${id} no existe`);
    }

    return empleado;
};

let getSalarioByEmpleado = async (empleado) => {
    let salario = salarios.find((salario) => salario.id === empleado.id);

    if (!salario) {
        throw new Error(`No se encontro un salario para ${empleado.nombre}`);
    }

    return {
        id: empleado.id,
        nombre: empleado.nombre,
        salario: salario.monto
    };
};

let getEmpleadoInfo = async (id) => {
    let empleado = await getEmpleadoById(id);
    let salario  = await getSalarioByEmpleado(empleado);
    return salario;
};



let id = 4;
getEmpleadoById(id)
    .then( empleado => getSalarioByEmpleado(empleado) )
    .then( salario => console.log('Empleado :>> ', salario) )
    .catch( err => console.warn(err.message) );

getEmpleadoInfo(id)
    .then(info => console.log('Info :>> ', info))
    .catch(err => console.warn(err));
