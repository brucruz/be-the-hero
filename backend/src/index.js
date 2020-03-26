// Importar pacote ExpressJS
const express = require('express');
// Importar routes definidas no arquivo routes.js
const routes = require('./routes');

// Chamar funcionalidade express()
const app = express();

// Informar ao Express para converter o arquivo JSON em objeto do JS
app.use(express.json());
// Iniciar rotas definidas no arquivo routes.js
app.use(routes);


// Definir porta para requisição local
app.listen(3333);