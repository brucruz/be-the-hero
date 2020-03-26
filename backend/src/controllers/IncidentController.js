// Controller que exportar os métodos da ONG

// Importar arquivo connection.js
const connection = require('../database/connection');

module.exports = {
    // Método List Incidents
    async index(request, response) {
        const incidents = await connection('incidents').select('*');

        return response.json(incidents);
    },
    
    // Método Create Incidents
    async create(request, response) {
        // Acessar dados do incident a partir do corpo da requisição
        const { title, description, value } = request.body;
        // Acessar ID da ONG através do Header
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        // Retornar ID
        return response.json({ id });
    }
};