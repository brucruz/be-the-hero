// Controller responsável por gerenciar a sessão logada dos usuários

// // Importar arquivo connection.js
const connection = require('../database/connection');

module.exports = {
    // Método Login - verificar se ONG existe
    async create(request, response) {
        // Buscar id informado na requisição
        const { id } = request.body;

        // Buscar na base de dados de ONGs
        const ong = await connection('ongs')
            // O id informado, na coluna 'id'
            .where('id', id)
            // Selecionar a coluna 'name', nome da ONG
            .select('name')
            // Trazer somente o primeiro resultado
            .first();
        
        // Se a ONG não existir
        if (!ong) {
            // Retornar status 400 (Bad Request) e erro 'No ONG found with this ID'
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        // Caso contrário
        return response.json(ong);
    }
}