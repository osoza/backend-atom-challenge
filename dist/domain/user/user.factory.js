import { User } from './user.entity.js';
export class UserFactory {
    static create(data) {
        return new User(data.id || '', data.email);
    }
}
