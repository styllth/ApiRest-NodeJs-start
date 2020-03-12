import { Router } from 'express';
import authRoutes from './routes/auth';
import projectsRoutes from './routes/projects';
import { verifyToken } from './utils/jwt';

const appRoutes = Router();

appRoutes.get('/', (request, response) => {
    return response.status(200).send({ message: 'Api funcionando' });
});

appRoutes.use('/auth', authRoutes);
appRoutes.use('/projects', verifyToken, projectsRoutes);

export default appRoutes;
