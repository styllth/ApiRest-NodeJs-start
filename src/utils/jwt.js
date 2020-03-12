/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_KEY;

function createToken(params = {}, expiry) {
    return jwt.sign(params, jwtKey, {
        expiresIn: expiry,
    });
}

function verifyToken(request, response, next) {
    try {
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

        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err)
                return response.status(401).send({
                    error: err,
                    msg: 'Token inválido',
                });

            request.headers.userId = decoded.id;

            next();
        });
    } catch (err) {
        return response.status(401).send({
            error: err,
        });
    }
}

const jwtUtils = {
    createToken,
    verifyToken,
};

module.exports = jwtUtils;
