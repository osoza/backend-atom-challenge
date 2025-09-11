// import { UserRepository } from '../domain/user/user.repository.js';
import { UserRepositoryMock as UserRepository } from '../domain/user/user.repository.mock.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

const repo = UserRepository.getInstance();

export class UserService {
  static async createUser(email: string) {
    return await repo.add(email);
  }

  static async login(email: string) {
    try {
      const user = await repo.findByEmail(email);
      if (!user) {
        return { done: false, message: 'Usuario no encontrado' };
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      return {
        done: true,
        message: 'Login exitoso',
        user,
        token
      };
    } catch (error: any) {
      return { done: false, message: error.message || 'Error al iniciar sesión' };
    }

  }

  static async findUser(email: string) {
    return await repo.findByEmail(email);
  }
}