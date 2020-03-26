// Importar pacote ExpressJS
const express = require('express');
// Pacote do ExpressJS para gerar chaves de criptografia
const crypto = require('crypto');

// Importar arquivo connection.js
const connection = require('./database/connection');

const routes = express.Router();

// Rota Listar ONGS
routes.get('/ongs', async (request, response) => {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
});

// Rota Create ONGs
routes.post('/ongs', async (request, response) => {
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
});

// Exportar routes
module.exports = routes;