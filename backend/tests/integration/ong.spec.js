// Teste para testar as funcionalidades da ONG

// Importar o supertest
const request = require('supertest');
// Importar o app
const app = require('../../src/app');
// Importar a conexão com o banco de dados
const connection = require('../../src/database/connection');


describe('ONG', () => {
    // Antes de executar os testes, fazer o migrate pelo knex para a base de dados de teste
    beforeEach(async() => {
        // dar rollback no banco de dados de teste para não encher
        await connection.migrate.rollback();
        // executar migration do banco de dados
        await connection.migrate.latest();
    });

    // Depois de terminar todos os testes, destruir a conexão com os bancos de dados
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send(
                {
                    name: "APAD2",
                    email: "contato@contato.com.br",
                    whatsapp: "11991400572",
                    city: "São Paulo",
                    uf: "SP"
            });
        
            // Espero que a resposta tenha a propriedade 'id'
            expect(response.body).toHaveProperty('id');
            // Espero que a propriedade tenha 8 caracteres
            expect(response.body.id).toHaveLength(8);
    })
})