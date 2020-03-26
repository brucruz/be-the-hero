// Importar pacote ExpressJS
const express = require('express');

// Importar Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');


const routes = express.Router();

// Rota List ONGS
routes.get('/ongs', OngController.index);

// Rota Create ONGs
routes.post('/ongs', OngController.create);


// Rota List Incident
routes.get('/incidents', IncidentController.index);
// Rota Create Incident
routes.post('/incidents', IncidentController.create);

// Exportar routes
module.exports = routes;