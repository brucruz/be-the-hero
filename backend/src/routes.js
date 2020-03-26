// Importar pacote ExpressJS
const express = require('express');

// Importar Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Rota de Login
routes.post('/sessions', SessionController.create);

// Rota List ONGS
routes.get('/ongs', OngController.index);
// Rota Create ONGs
routes.post('/ongs', OngController.create);

// Rota List Incidents by ONG
routes.get('/profile', ProfileController.index);

// Rota List Incident
routes.get('/incidents', IncidentController.index);
// Rota Create Incident
routes.post('/incidents', IncidentController.create);
// Rota Delete Incident
routes.delete('/incidents/:id', IncidentController.delete);

// Exportar routes
module.exports = routes;