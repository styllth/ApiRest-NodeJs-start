const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
    const autHeader = request.headers.authorization;

    if (!autHeader)
        return response
            .status(401)
            .send({ error: 'Token de autenticação ausente!' });

    const parts = autHeader.split(' ');

    if (!parts.length === 2)
        return response.status(401).send({ error: 'Erro no Token !' });

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema))
        return response.status(401).send({ error: 'Token não formatado' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return response.status(401).send({ error: 'Token inválido' });

        request.userId = decoded.id;

        return next();
    });

    return response.status(401).send({ error: 'Erro desconhecido' });
};
