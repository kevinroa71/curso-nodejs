// Let
function _let() {
    let nombre = "Kevin";

    if (true) {
        let nombre = "Otro Kevin";
        console.log(nombre);
    }

    console.log(nombre);
}

function _var() {
    var nombre = "Kevin";

    if (true) {
        var nombre = "Otro Kevin";
        console.log(nombre);
    }

    console.log(nombre);
}

_let();
_var();
