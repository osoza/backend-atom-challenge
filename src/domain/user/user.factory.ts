import { User } from './user.entity.js';

export class UserFactory {
   static create(data: { id?: string; email: string }) {
      return new User(data.id || '', data.email);
   }
}