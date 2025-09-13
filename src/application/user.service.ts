import { UserRepository } from '../domain/user/user.repository.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

const repository = UserRepository.getInstance();

export class UserService {
    static async createAccount(email: string) {
        const user = await repository.add(email);

        if (!user) {
            return { done: false, message: 'La cuenta no pudo ser creada' };
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return { done: true, message: 'Cuenta creada existosamente', user, token };
    }

    static async login(email: string) {
        try {
            const user = await repository.findByEmail(email);

            if (!user) {
                return { done: false, message: 'Cuenta no encontrada' };
            }

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            return { done: true, message: 'Inicio de sesión realizado exisitosamente', user, token };
        } catch (error: any) {
            return { done: false, message: error.message || 'Error al iniciar sesión' };
        }
    }
}