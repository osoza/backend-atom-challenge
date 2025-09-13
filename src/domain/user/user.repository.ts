import { db } from '../../config/firebase.js';
import { UserFactory } from './user.factory.js';
import { User } from './user.entity.js';

export class UserRepository {
    private static instance: UserRepository;
    private collection = db.collection('users');

    private constructor() { }
    public static getInstance() {
        if (!UserRepository.instance) UserRepository.instance = new UserRepository();
        return UserRepository.instance;
    }

    async findByEmail(email: string): Promise<User | null> {
        const snapshot = await this.collection.where('email', '==', email).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as User;
    }

    async add(email: string): Promise<User> {
        const existing = await this.findByEmail(email);
        if (existing) throw new Error('Usuario ya existe');

        const user = UserFactory.create({ email });
        const docRef = await this.collection.add({ email: user.email });
        user.id = docRef.id;
        return user;
    }
}