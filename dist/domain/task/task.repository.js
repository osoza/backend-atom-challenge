import { db } from '../../config/firebase.js';
import { TaskFactory } from './task.factory.js';
export class TaskRepository {
    static instance;
    collection = db.collection('tasks');
    constructor() { }
    static getInstance() {
        if (!TaskRepository.instance)
            TaskRepository.instance = new TaskRepository();
        return TaskRepository.instance;
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async add(data) {
        const task = TaskFactory.create(data);
        const docRef = await this.collection.add({
            title: task.title,
            description: task.description,
            completed: task.completed
        });
        task.id = docRef.id;
        return task;
    }
    async update(id, data) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists)
            return null;
        await docRef.update(data);
        const updated = await docRef.get();
        return { id: updated.id, ...updated.data() };
    }
    async delete(id) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists)
            return false;
        await docRef.delete();
        return true;
    }
}
