const { Router } = require('express');

const projects = require('../controllers/ProjectController');

const projectsRoutes = Router();

projectsRoutes.get('/', projects.index);
projectsRoutes.post('/', projects.store);
projectsRoutes.get('/:projectId', projects.show);
projectsRoutes.put('/:projectId', projects.update);
projectsRoutes.delete('/:projectId', projects.delete);

module.exports = projectsRoutes;
