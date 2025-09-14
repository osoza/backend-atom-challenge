import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const serviceAccount = require('./firebase-service-account.json');

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    // credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();