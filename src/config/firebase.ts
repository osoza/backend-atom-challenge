import admin from "firebase-admin";

let dbInstance: FirebaseFirestore.Firestore | null = null;

export function initFirebase(): FirebaseFirestore.Firestore {
   if (dbInstance) return dbInstance;

   const apps = admin.apps ?? [];
   let app: admin.app.App;

   if (apps.length > 0) {
      app = apps[0]!;
   } else {
      app = admin.initializeApp({
         credential: admin.credential.applicationDefault(),
         projectId: "atom-challenge-1567c",
      });
   }

   dbInstance = app.firestore();
   return dbInstance;
}

export function getDb(): FirebaseFirestore.Firestore {
   if (!dbInstance)
      throw new Error("Firebase no ha sido inicializado.");
   return dbInstance;
}