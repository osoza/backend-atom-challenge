import express from 'express';
import { TaskService } from '../../../application/task.service.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateFields } from '../middlewares/validation.middleware.js';

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res) => res.json(await TaskService.getAll()));
router.post('/', validateFields(['title', 'description']), async (req, res) => res.json(await TaskService.addTask(req.body)));
router.put('/:id', async (req, res) => res.json(await TaskService.updateTask(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json({ success: await TaskService.deleteTask(req.params.id) }));

export default router;