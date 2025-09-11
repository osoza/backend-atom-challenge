// import { TaskRepository } from '../domain/task/task.repository.js';
import { TaskRepositoryMock as TaskRepository } from '../domain/task/task.repository.mock.js';
import { Task } from '../domain/task/task.entity.js';

const repo = TaskRepository.getInstance();

export class TaskService {
  static async getAll(): Promise<Task[]> { return await repo.getAll(); }
  static async addTask(data: { title: string; description: string }): Promise<Task> {
    return await repo.add(data);
  }
  static async updateTask(id: string, data: Partial<Task>): Promise<Task | null> {
    return await repo.update(id, data);
  }
  static async deleteTask(id: string): Promise<boolean> {
    return await repo.delete(id);
  }
}