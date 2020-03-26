// Controller que exportar os métodos da ONG

// Importar arquivo connection.js
const connection = require('../database/connection');

// Pacote do ExpressJS para gerar chaves de criptografia
const crypto = require('crypto');


module.exports = {
    // Método Listar ONGs
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    // Método Criar ONGs
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

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