// Importar pacote ExpressJS
const express = require('express');

// Importar Controllers
const OngController = require('./controllers/OngController');


const routes = express.Router();

// Rota Listar ONGS
routes.get('/ongs', OngController.index);

// Rota Create ONGs
routes.post('/ongs', OngController.create);

// Exportar routes
module.exports = routes;