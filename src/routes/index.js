const { Router } = require('express');
const authRoutes = require('./auth');
const projectsRoutes = require('./projects');
const jwtUtils = require('../utils/jwt');

const routes = Router();

routes.get('/', (request, response) => {
    return response.status(200).send({ message: 'Api funcionando' });
});

routes.use('/auth', authRoutes);
routes.use('/projects', jwtUtils.verifyToken, projectsRoutes);

module.exports = routes;
