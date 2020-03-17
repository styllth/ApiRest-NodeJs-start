/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { env } = process;

const jwtKey = env.JWT_KEY;
const expires = env.TOKEN_EXPIRES;

module.exports = {
    createToken(params = {}) {
        return jwt.sign(params, jwtKey, { expiresIn: expires });
    },

    verifyToken(request, response, next) {
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
                return response
                    .status(401)
                    .send({ error: 'Token não formatado' });

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
    },
};
