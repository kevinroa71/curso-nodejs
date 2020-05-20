const argv = require('./config/yargs').argv;
const lugar = require('./src/lugar');
const clima = require('./src/clima');


const getInfo = async (direccion) => {
    const respLugar = await lugar.buscarPorDireccion(direccion);
    const respClima = await clima.buscarPorLatLon(respLugar.lat, respLugar.lon);

    if (!respClima) throw new Error(`No se pudo determinar el clima de ${direccion}`);

    return `El clima de ${respLugar.direccion} es de ${respClima}`;
};


getInfo(argv.direccion)
    .then(console.log)
    .catch(console.warn);
