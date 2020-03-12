import { Router } from 'express';

import projectController from '../app/controllers/ProjectController';

const projectsRoutes = Router();

projectsRoutes.get('/', projectController.index);
projectsRoutes.post('/', projectController.store);
projectsRoutes.get('/:projectId', projectController.show);
projectsRoutes.put('/:projectId', projectController.update);
projectsRoutes.delete('/:projectId', projectController.delete);

export default projectsRoutes;
