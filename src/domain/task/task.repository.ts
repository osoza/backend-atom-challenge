import { db } from '../../config/firebase.js';
import { TaskFactory } from './task.factory.js';
import { Task } from './task.entity.js';

export class TaskRepository {
  private static instance: TaskRepository;
  private collection = db.collection('tasks');

  private constructor() {}
  public static getInstance() {
    if (!TaskRepository.instance) TaskRepository.instance = new TaskRepository();
    return TaskRepository.instance;
  }

  async getAll(): Promise<Task[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  async add(data: { title: string; description: string }): Promise<Task> {
    const task = TaskFactory.create(data);
    const docRef = await this.collection.add({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
    task.id = docRef.id;
    return task;
  }

  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    await docRef.update(data);
    const updated = await docRef.get();
    return { id: updated.id, ...updated.data() } as Task;
  }

  async delete(id: string): Promise<boolean> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return false;
    await docRef.delete();
    return true;
  }
}