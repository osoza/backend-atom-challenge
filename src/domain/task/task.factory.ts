import { Task } from './task.entity.js';
import { Timestamp } from 'firebase-admin/firestore';

export class TaskFactory {
  static create(data: { id?: string; title: string; description: string }) {
    const createdAt = Timestamp.now();
    return new Task(data.id || '', data.title, data.description, createdAt, false);
  }
}