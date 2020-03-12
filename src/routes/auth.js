import { Router } from 'express';
import {
    register,
    authenticate,
    forgot_password,
    reset_password,
} from '../app/controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', authenticate);
authRoutes.post('/forgot_password', forgot_password);
authRoutes.post('/reset_password', reset_password);

export default authRoutes;
