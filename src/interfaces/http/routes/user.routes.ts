import express from 'express';
import { UserService } from '../../../application/user.service.js';
// import { authenticate } from '../middlewares/auth.middleware.js';
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

// router.get('/:email', authenticate, async (req, res) => {
//   const user = await UserService.findUser(req.params.email);
//   if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
//   res.json(user);
// });

export default router;