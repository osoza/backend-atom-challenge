// import admin from 'firebase-admin';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';
export const db = {
    collection: (name) => ({
        get: async () => ({
            docs: [
                { id: '1', data: () => ({ email: 'oscar@example.com' }) },
            ],
        }),
        add: async (data) => ({ id: '1' }),
        doc: (id) => ({
            get: async () => ({ exists: false, id, data: () => ({}) }),
            update: async (data) => { },
            delete: async () => { },
        }),
        where: (field, op, value) => ({
            get: async () => ({ empty: true, docs: [] }),
        }),
    }),
};
