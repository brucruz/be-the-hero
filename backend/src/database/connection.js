// Arquivo para criar a conexão do NodeJS com o banco de dados

// Importar o knex
const knex = require('knex');
// Importar configurações do banco de dados do arquivo knexfile.js
const configuration = require('../../knexfile')

// se a variável ambiente for 'test', a configuração utilizada será configuration.test, se não será configuration.development
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

//Criar conexão usando o knex, passando o parâmetro de conexão de development
const connection = knex(config);

// Exportar conexão com o banco de dados
module.exports = connection;