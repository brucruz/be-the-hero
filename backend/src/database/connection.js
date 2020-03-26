// Arquivo para criar a conexão do NodeJS com o banco de dados

// Importar o knex
const knex = require('knex');
// Importar configurações do banco de dados do arquivo knexfile.js
const configuration = require('../../knexfile')

//Criar conexão usando o knex, passando o parâmetro de conexão de development
const connection = knex(configuration.development);

// Exportar conexão com o banco de dados
module.exports = connection;