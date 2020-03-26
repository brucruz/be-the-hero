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
    },

    // Método Delete Incident
    async delete(request, response) {
        // Buscar o id da requisição sendo enviado no request
        const { id } = request.params;
        // Acessar ID da ONG através do Header
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            // Buscar por um incident aonde o id da tabela ('id') for igual ao id da requisição (id)
            .where('id', id)
            // Selecionar apenas a coluna 'ong_id'
            .select('ong_id')
            // Retornar apenas o primeiro resultado
            .first();
        
        // Verificar se o ong_id do incidente buscado no banco de dados for diferente do ong_id que está logado na aplicação
        if (incidents.ong_id !== ong_id) {
            // Retornar status 401 (não autorizado) como status da requisição, com um erro em JSON
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        // Senão, deletar do banco
        await connection('incidents').where('id', id).delete();

        //Retornar status 204: No content (resposta sem conteúdo)
        return response.status(204).send();
    }
};