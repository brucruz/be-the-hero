// Importar pacote ExpressJS
const express = require('express');
// Importar o Celebrate para validações
const { celebrate, Segments, Joi } = require('celebrate');


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
routes.post('/ongs', 
    // Validador do objeto recebido pela api
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        })
    }),OngController.create);

// Rota List Incidents by ONG
routes.get('/profile', 
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
    }),ProfileController.index);

// Rota List Incident
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.index);
// Rota Create Incident
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().integer().required(),
    })
}),IncidentController.create);
// Rota Delete Incident
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}),IncidentController.delete);

// Exportar routes
module.exports = routes;