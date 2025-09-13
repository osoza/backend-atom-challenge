import express from 'express';
import { UserService } from '../../../application/user.service.js';
import { validateFields } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/register', validateFields(['email']), async (req, res) => {
    const { email } = req.body;
    try {
        const result = await UserService.createAccount(email);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await UserService.login(email);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ done: false, message: error.message });
    }
});

export default router;