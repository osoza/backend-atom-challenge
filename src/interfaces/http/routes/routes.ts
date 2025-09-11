import { Router } from 'express';
import userRoutes from './user.routes.js';
import taskRoutes from './task.routes.js';

const router = Router();

// Aquí aplicamos el prefijo /api a todas las rutas
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

export default router;
