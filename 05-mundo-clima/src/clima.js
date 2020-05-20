const axios = require('axios');
const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?appid=1ce6b4725a8f1d2da3fcfde91e803cb2&units=metric',
    timeout: 5000
});

module.exports = {
    buscarPorLatLon: async (lat, lon) => {
        const resp = await api.get('', {
            params: {
                lat: lat,
                lon: lon
            }
        });

        const temp = resp.data.main;
        return temp.temp;
    }
};
