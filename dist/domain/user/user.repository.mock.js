import { User } from './user.entity.js';
export class UserRepositoryMock {
    static instance;
    users = [];
    constructor() { }
    static getInstance() {
        if (!UserRepositoryMock.instance)
            UserRepositoryMock.instance = new UserRepositoryMock();
        return UserRepositoryMock.instance;
    }
    async findByEmail(email) {
        const user = this.users.find(u => u.email === email);
        return user || null;
    }
    async add(email) {
        const existing = await this.findByEmail(email);
        if (existing)
            throw new Error('Usuario ya existe');
        const newUser = new User(`${this.users.length + 1}`, email);
        this.users.push(newUser);
        return newUser;
    }
}
