/* eslint-disable consistent-return */
import bcriptjs from 'bcryptjs';
import crypto from 'crypto';
import { createToken } from '../../utils/jwt';
import mailer from '../../modules/mailer';
import User from '../models/User';

require('dotenv').config();

module.exports = {
    // localhost/auth/register
    async register(request, response) {
        const { email } = request.body;
        try {
            if (await User.findOne({ email }))
                return response
                    .status(400)
                    .send({ error: 'Usuário já cadastrado!' });

            const user = await User.create(request.body);

            user.password = undefined;

            return response.send({
                user,
                token: createToken({ id: user.id }),
            });
        } catch (err) {
            console.log(err);
            return response
                .status(400)
                .send({ error: 'Falha ao registrar o usuário!' });
        }
    },

    // localhost/auth/login
    async authenticate(request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return response
                .status(400)
                .send({ error: 'Usuário não cadastrado' });

        if (!(await bcriptjs.compare(password, user.password)))
            return response.status(400).send({ error: 'Senha inválida' });

        user.password = undefined;

        response.send({
            user,
            token: createToken({ id: user.id }),
        });
    },

    // localhost/auth/forgot_password
    async forgot_password(request, response) {
        const { email } = request.body;

        try {
            const user = await User.findOne({ email });

            if (!user)
                return response
                    .status(400)
                    .send({ error: 'Usuário não cadastrado' });

            const token = crypto.randomBytes(20).toString('hex');

            const dateExpires = new Date();
            dateExpires.setHours(dateExpires.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                $set: {
                    passwordResetToken: token,
                    passwordResetExpires: dateExpires,
                },
            });

            mailer.sendMail(
                {
                    to: email,
                    from: 'no-replay@mail.com',
                    template: '/auth/fotgot_password',
                    context: { token },
                },
                err => {
                    if (err) {
                        console.log(err);
                        return response.status(400).send({
                            error:
                                'Falha ao enviar o email de senha esquecida!',
                        });
                    }
                    return response.status(200).send({
                        sucess: 'Verifique sua caixa de correio',
                    });
                }
            );
        } catch (err) {
            console.log(err);
            return response.status(400).send({
                error: 'Falha ao relembrar a senha, tente novamente!',
            });
        }
    },

    // localhost/auth/reset_password
    async reset_password(request, response) {
        const { email, token, password } = request.body;

        try {
            const user = await User.findOne({ email }).select(
                '+passwordResetToken passwordResetExpires'
            );

            // verifica se o usuário existe
            if (!user)
                return response
                    .status(400)
                    .send({ error: 'Usuário não cadastrado' });

            // verifica se o token é válido
            if (token !== user.passwordResetToken)
                return response.status(400).send({ error: 'Token inválido' });

            // verifica se o token não expirou
            const now = new Date();
            if (now > user.passwordResetExpires)
                return response.status(400).send({ error: 'Token expirado' });

            user.password = password;

            await user.save();

            return response.status(201).send({
                sucess: 'Senha atualizada com sucesso',
            });
        } catch (err) {
            console.log(err);
            return response.status(400).send({
                error: 'Falha ao resetar a senha!',
            });
        }
    },
};
