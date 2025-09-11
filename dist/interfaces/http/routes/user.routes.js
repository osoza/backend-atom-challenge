import express from 'express';
import { UserService } from '../../../application/user.service.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateFields } from '../middlewares/validation.middleware.js';
const router = express.Router();
// Crear usuario
router.post('/register', validateFields(['email']), async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserService.createUser(email);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Login
router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await UserService.login(email);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.get('/test', async (req, res) => {
    res.json({ name: 'oscar' });
});
// Buscar usuario (protegido)
router.get('/:email', authenticate, async (req, res) => {
    const user = await UserService.findUser(req.params.email);
    if (!user)
        return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
});
export default router;
