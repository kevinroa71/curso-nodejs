let cliente = {
    nombre: 'Kevin',
    apellido: 'Roa',
    edad: 29,
    saludar() {
        return `Hola me llamo ${this.nombre} ${this.apellido} de ${this.edad} anos de edad`;
    }
};


console.log(cliente.saludar());

// Destructurar objeto
let {nombre, apellido, edad:old} = cliente;

console.log(nombre);
console.log(apellido);
console.log(old);
