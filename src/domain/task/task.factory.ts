import { Task } from './task.entity.js';

export class TaskFactory {
  static create(data: { id?: string; title: string; description: string }) {
    return new Task(data.id || '', data.title, data.description);
  }
}