import { Task } from './task.entity.js';
export class TaskFactory {
    static create(data) {
        return new Task(data.id || '', data.title, data.description);
    }
}
