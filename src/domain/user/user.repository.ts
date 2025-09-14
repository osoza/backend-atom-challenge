// import { db } from '../../config/firebase.js';
// import { UserFactory } from './user.factory.js';
// import { User } from './user.entity.js';

// export class UserRepository {
//     private static instance: UserRepository;
//     private collection!: FirebaseFirestore.CollectionReference;
//     // private collection = db.collection('users');

//     private constructor() {
//         if (!db) throw new Error("Firebase no está inicializado");
//         this.collection = db.collection('users');
//     }

//     public static getInstance() {
//         if (!UserRepository.instance) UserRepository.instance = new UserRepository();
//         return UserRepository.instance;
//     }

//     async findByEmail(email: string): Promise<User | null> {
//         const snapshot = await this.collection.where('email', '==', email).get();
//         if (snapshot.empty) return null;
//         const doc = snapshot.docs[0];
//         return { id: doc.id, ...doc.data() } as User;
//     }

//     async add(email: string): Promise<User> {
//         const existing = await this.findByEmail(email);
//         if (existing) throw new Error('Usuario ya existe');

//         const user = UserFactory.create({ email });
//         const docRef = await this.collection.add({ email: user.email });
//         user.id = docRef.id;
//         return user;
//     }
// }

import type { Firestore } from "firebase-admin/firestore";
import { UserFactory } from "./user.factory.js";
import { User } from "./user.entity.js";

export class UserRepository {
   private static instance: UserRepository;
   private collection: FirebaseFirestore.CollectionReference;

   constructor(db: Firestore) {
      if (!db) throw new Error("Firebase DB no inicializado");
      this.collection = db.collection("users");
   }

   public static getInstance(db: Firestore) {
      if (!UserRepository.instance) {
         UserRepository.instance = new UserRepository(db);
      }
      return UserRepository.instance;
   }

   async findByEmail(email: string): Promise<User | null> {
      const snapshot = await this.collection.where("email", "==", email).get();
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as User;
   }

   async add(email: string): Promise<User> {
      const existing = await this.findByEmail(email);
      if (existing) throw new Error("Usuario ya existe");

      const user = UserFactory.create({ email });
      const docRef = await this.collection.add({ email: user.email });
      user.id = docRef.id;
      return user;
   }
}