import { User } from './user.entity.js';

export class UserRepositoryMock {
  private static instance: UserRepositoryMock;
  private users: User[] = [];

  private constructor() {}

  public static getInstance() {
    if (!UserRepositoryMock.instance) UserRepositoryMock.instance = new UserRepositoryMock();
    return UserRepositoryMock.instance;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async add(email: string): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) throw new Error('Usuario ya existe');

    const newUser = new User(`${this.users.length + 1}`, email);
    this.users.push(newUser);
    return newUser;
  }
}