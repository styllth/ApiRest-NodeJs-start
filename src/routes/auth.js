const { Router } = require('express');
const authController = require('../controllers/AuthController');

const authRoutes = Router();

authRoutes.post('/auth/register', authController.register);
authRoutes.post('/auth/login', authController.authenticate);

module.exports = authRoutes;
