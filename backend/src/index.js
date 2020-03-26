const express = require('express');
const routes = require('./routes');

const app = express();

// Informar ao Express para converter o arquivo JSON em objeto do JS
app.use(express.json());
app.use(routes);


app.listen(3333);