// import { TaskRepository } from '../domain/task/task.repository.js';
import { TaskRepositoryMock as TaskRepository } from '../domain/task/task.repository.mock.js';
const repo = TaskRepository.getInstance();
export class TaskService {
    static async getAll() { return await repo.getAll(); }
    static async addTask(data) {
        return await repo.add(data);
    }
    static async updateTask(id, data) {
        return await repo.update(id, data);
    }
    static async deleteTask(id) {
        return await repo.delete(id);
    }
}
