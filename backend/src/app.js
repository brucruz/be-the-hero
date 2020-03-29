// Importar pacote ExpressJS
const express = require('express');
// Importar o CORS
const cors = require('cors');
// Importar o Celebrate
const { errors } = require('celebrate');
// Importar routes definidas no arquivo routes.js
const routes = require('./routes');

// Chamar funcionalidade express()
const app = express();

// Iniciar a utilização do CORS
app.use(cors());

// Informar ao Express para converter o arquivo JSON em objeto do JS
app.use(express.json());
// Iniciar rotas definidas no arquivo routes.js
app.use(routes);
// Iniciar o errors do Celebrate
app.use(errors());


//exportar o app
module.exports = app;