import { Task } from './task.entity.js';
export class TaskRepositoryMock {
    static instance;
    tasks = [];
    constructor() { }
    static getInstance() {
        if (!TaskRepositoryMock.instance)
            TaskRepositoryMock.instance = new TaskRepositoryMock();
        return TaskRepositoryMock.instance;
    }
    async getAll() {
        return this.tasks;
    }
    async add(data) {
        const task = new Task(`${this.tasks.length + 1}`, data.title, data.description);
        this.tasks.push(task);
        return task;
    }
    async update(id, data) {
        const task = this.tasks.find(t => t.id === id);
        if (!task)
            return null;
        Object.assign(task, data);
        return task;
    }
    async delete(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1)
            return false;
        this.tasks.splice(index, 1);
        return true;
    }
}
