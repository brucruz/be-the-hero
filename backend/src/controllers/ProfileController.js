// Controller responsável pelas informações específicos de uma única ONG

// Importar arquivo connection.js
const connection = require('../database/connection');

module.exports = {
    // Método List Incidents by ONG
    async index(request, response) {
        // ID da ONG autenticada presente no header da requisição
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            // Onde a coluna ONG_ID for igual ao ID da ONG autenticada
            .where('ong_id', ong_id)
            // Trazer todos os campos
            .select('*');

        return response.json(incidents);
    }
}