import { Task } from './task.entity.js';

export class TaskRepositoryMock {
  private static instance: TaskRepositoryMock;
  private tasks: Task[] = [];

  private constructor() {}

  public static getInstance() {
    if (!TaskRepositoryMock.instance) TaskRepositoryMock.instance = new TaskRepositoryMock();
    return TaskRepositoryMock.instance;
  }

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async add(data: { title: string; description: string }): Promise<Task> {
    const task = new Task(`${this.tasks.length + 1}`, data.title, data.description);
    this.tasks.push(task);
    return task;
  }

  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;
    Object.assign(task, data);
    return task;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}