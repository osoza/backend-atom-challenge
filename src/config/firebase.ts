// import admin from 'firebase-admin';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const serviceAccount = join(__dirname, './firebase-service-account.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// export const db = admin.firestore();

type DocMock = {
  id: string;
  data: () => any;
  exists?: boolean;
};

type CollectionMock = {
  get: () => Promise<{ docs: DocMock[] }>;
  add: (data: any) => Promise<{ id: string }>;
  doc: (id: string) => {
    get: () => Promise<{ exists: boolean; id: string; data: () => any }>;
    update: (data: any) => Promise<void>;
    delete: () => Promise<void>;
  };
  where: (field: string, op: string, value: any) => { get: () => Promise<{ empty: boolean; docs: DocMock[] }> };
};

export const db: { collection: (name: string) => CollectionMock } = {
  collection: (name: string) => ({
    get: async () => ({
      docs: [
        { id: '1', data: () => ({ email: 'oscar@example.com' }) },
      ],
    }),
    add: async (data: any) => ({ id: '1' }),
    doc: (id: string) => ({
      get: async () => ({ exists: false, id, data: () => ({}) }),
      update: async (data: any) => {},
      delete: async () => {},
    }),
    where: (field: string, op: string, value: any) => ({
      get: async () => ({ empty: true, docs: [] }),
    }),
  }),
};