import { TaskRepository } from '../domain/task/task.repository.js';
import { Task } from '../domain/task/task.entity.js';

const repository = TaskRepository.getInstance();

export class TaskService {
    static async getAll(filters?: { title?: string; description?: string; completed?: boolean }): Promise<{ done: boolean, message: string, tasks: Task[] }> {
        const tasks = await repository.getAll(filters);
    return { done: true, message: 'Carga completada', tasks };
}

    static async addTask(data: { title: string; description: string }): Promise<{ done: boolean, message: string }> {
        const task = await repository.add(data);
        return { done: task ? true : false, message: "Tarea creada exitosamente" };
    }

    static async updateTask(id: string, data: Partial<Task>): Promise<Task | null> {
        return await repository.update(id, data);
    }

    static async deleteTask(id: string): Promise<boolean> {
        return await repository.delete(id);
    }
}
