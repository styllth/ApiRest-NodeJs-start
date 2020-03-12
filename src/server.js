const express = require('express');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
require('dotenv').config();

// Configura a API
const api = express();
api.use(cors());
api.use(express.json());
api.use(routes);

// Configura o Servidor
const server = http.Server(api);
server.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Api rodando na porta 3333!');
    console.log(`Api Environment = ${process.env.APP_ENV}`);
});
