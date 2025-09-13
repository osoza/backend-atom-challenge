import { TaskRepository } from '../domain/task/task.repository.js';
import { Task } from '../domain/task/task.entity.js';

const repository = TaskRepository.getInstance();

export class TaskService {
    static async getAll(filters?: { title?: string; description?: string; completed?: boolean }): Promise<{ done: boolean, message: string, tasks?: Task[] }> {
        try {
            const tasks = await repository.getAll(filters);
            return { done: true, message: 'Carga completada', tasks };
        } catch (error: any) {
            return { done: false, message: error.message };
        }
    }

    static async addTask(data: { title: string; description: string }): Promise<{ done: boolean, message: string }> {
        try {
            const task = await repository.add(data);
            return { done: task ? true : false, message: task ? "Tarea creada exitosamente" : "No se pudo crear la tarea" };
        } catch (error: any) {
            return { done: false, message: error.message };
        }
    }

    static async updateTask(id: string, data: Partial<Task>): Promise<{ done: boolean, message: string }> {
        try {
            const task = await repository.update(id, data);
            return { done: task ? true : false, message: task ? "Tarea modificada exitosamente" : "No se pudo modificar la tarea" };
        } catch (error: any) {
            return { done: false, message: error.message };
        }

    }

    static async deleteTask(id: string): Promise<boolean> {
        try {
            const deleted = await repository.delete(id);
            return deleted;
        } catch (error: any) {
            return false
        }
    }
}