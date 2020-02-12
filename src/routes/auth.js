const { Router } = require('express');
const authController = require('../controllers/AuthController');

const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.authenticate);
authRoutes.post('/forgot_password', authController.forgot_password);
authRoutes.post('/reset_password', authController.reset_password);

module.exports = authRoutes;
