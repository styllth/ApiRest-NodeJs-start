const { Router } = require('express');
const authMiddleware = require('../middlewares/auth');
const authRoutes = require('./auth');
const projectsRoutes = require('./projects');

const routes = Router();

routes.get('/', (request, response) => {
    return response.send('<h1>Api funcionando</h1>');
});

routes.use('/auth', authRoutes);

routes.use(authMiddleware);

routes.use('/projects', projectsRoutes);

module.exports = routes;
