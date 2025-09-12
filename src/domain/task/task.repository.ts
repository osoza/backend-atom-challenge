import { db } from '../../config/firebase.js';
import { TaskFactory } from './task.factory.js';
import { Task } from './task.entity.js';
import { Timestamp } from 'firebase-admin/firestore';

export class TaskRepository {
    private static instance: TaskRepository;
    private collection = db.collection('tasks');

    private constructor() { }
    public static getInstance() {
        if (!TaskRepository.instance) TaskRepository.instance = new TaskRepository();
        return TaskRepository.instance;
    }

    async getAll(filters?: { title?: string; description?: string; completed?: boolean }): Promise<Task[]> {
        let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = this.collection;

        if (filters) {
            if (filters.completed !== undefined) {
                query = query.where("completed", "==", filters.completed);
            }
        }

        query = query.orderBy('createdAt', 'asc');

        const snapshot = await query.get();

        let tasks = snapshot.docs.map(doc => {
            const data = doc.data() as any;

            let createdAtDate: Date;

            if (data.createdAt?.toDate) {
                createdAtDate = data.createdAt.toDate();
            } else if (data.createdAt instanceof Date) {
                createdAtDate = data.createdAt;
            } else {
                createdAtDate = new Date(data.createdAt);
            }

            const pad = (n: number) => n.toString().padStart(2, '0');
            const formattedDate =
                `${pad(createdAtDate.getDate())}-${pad(createdAtDate.getMonth() + 1)}-${createdAtDate.getFullYear()} ` +
                `${pad(createdAtDate.getHours())}:${pad(createdAtDate.getMinutes())}:${pad(createdAtDate.getSeconds())}`;

            return {
                id: doc.id,
                title: data.title,
                description: data.description,
                completed: data.completed,
                createdAt: formattedDate
            } as Task;
        });

        const normalizeStr = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (filters) {
            if (filters.title) {
                const titleNorm = normalizeStr(filters.title);
                tasks = tasks.filter(t => normalizeStr(t.title).includes(titleNorm));
            }
            if (filters.description) {
                const descNorm = normalizeStr(filters.description);
                tasks = tasks.filter(t => normalizeStr(t.description).includes(descNorm));
            }
        }

        return tasks;
    }

    async add(data: { title: string; description: string }): Promise<Task> {
        const task = TaskFactory.create(data);
        const docRef = await this.collection.add({
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
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