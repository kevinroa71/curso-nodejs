const axios = require('axios');
const api = axios.create({
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com',
    timeout: 5000,
    headers: {
        'x-rapidapi-key': 'ac3620b08emsh2a2f647c393ced1p1f9f13jsn81f4467c756c',
        'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com'
    }
});

module.exports = {
    buscarPorDireccion: async (direccion) => {
        const resp = await api.get('/latlon.php', {params: {location: direccion}});
        const results = resp.data.Results;

        if (results.length < 1) throw new Error(`Sin coincidencias para: ${direccion}`);

        const lugar = results.shift();

        return {
            direccion: lugar.name,
            lat: lugar.lat,
            lon: lugar.lon
        };
    }
};
