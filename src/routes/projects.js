const { Router } = require('express');

const projects = require('../controllers/ProjectController');

const projectsRoutes = Router();

projectsRoutes.get('/projects', projects.index);
projectsRoutes.post('/projects', projects.store);
projectsRoutes.get('/projects/:projectId', projects.show);
projectsRoutes.put('/projects/:projectId', projects.update);
projectsRoutes.delete('/projects/:projectId', projects.delete);

module.exports = projectsRoutes;
