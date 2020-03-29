// Controller que exportar os métodos da ONG

// Importar utils
const generateUniqueId = require('../utils/generateUniqueId');

// Importar arquivo connection.js
const connection = require('../database/connection');

module.exports = {
    // Método Listar ONGs
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    // Método Criar ONGs
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();

        // inserção de dados na tabela 'ongs'
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    }
};