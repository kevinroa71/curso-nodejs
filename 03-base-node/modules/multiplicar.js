const fs = require('fs');

module.exports = {
    generarTablaMultiplicar: async (base, limite = 10) => {
        let data = '';

        if(!Number(base)) throw new Error(`El numero base <<${base}>> no es correcto`);
        if(!Number(limite)) throw new Error(`El limite <<${limite}>> no es correcto`);

        for (let i = 1; i <= limite; i++)
            data += `${base} * ${i} = ${base*i}\n`;

        return data;
    },
    crearArchivoTablaMultiplicar(base, limite = 10) {
        return new Promise((resolve, reject) => {
            this.generarTablaMultiplicar(base, limite)
                .then(data => {
                    let file = `./tablas/tabla-${base}.txt`;
                    fs.writeFile(file, data, (err) => err ? reject(err) : resolve(file));
                })
                .catch(err => reject(err));
        });
    }
};
