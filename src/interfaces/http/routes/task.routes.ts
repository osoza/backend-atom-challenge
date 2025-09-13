import express from 'express';
import { TaskService } from '../../../application/task.service.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateFields } from '../middlewares/validation.middleware.js';

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res) => {
    const { title, description, completed } = req.query;
    const completedBool = completed !== undefined ? completed === 'true' : undefined;
    const filters: any = {};

    if (title) {
        filters.title = title;
    }

    if (description) {
        filters.description = description;
    }

    if (completedBool !== undefined) {
        filters.completed = completedBool;
    }

    const tasks = await TaskService.getAll(filters);
    res.json(tasks);
});
router.post('/', validateFields(['title', 'description', 'createdAt', 'completed']), async (req, res) => res.json(await TaskService.addTask(req.body)));
router.put('/:id', async (req, res) => res.json(await TaskService.updateTask(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json({ success: await TaskService.deleteTask(req.params.id) }));

export default router;