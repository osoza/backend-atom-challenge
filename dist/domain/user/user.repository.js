import { db } from '../../config/firebase.js';
import { UserFactory } from './user.factory.js';
export class UserRepository {
    static instance;
    collection = db.collection('users');
    constructor() { }
    static getInstance() {
        if (!UserRepository.instance)
            UserRepository.instance = new UserRepository();
        return UserRepository.instance;
    }
    async findByEmail(email) {
        const snapshot = await this.collection.where('email', '==', email).get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }
    async add(email) {
        const existing = await this.findByEmail(email);
        if (existing)
            throw new Error('Usuario ya existe');
        const user = UserFactory.create({ email });
        const docRef = await this.collection.add({ email: user.email });
        user.id = docRef.id;
        return user;
    }
}
