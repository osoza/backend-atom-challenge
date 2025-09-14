import cors from 'cors';
import { CORS_ORIGIN } from './env.js';

const allowedOrigins = [
   'http://localhost:4200',
   'http://localhost:5000',
   'https://atom-challenge-frontend.web.app'
];

export const corsOptions = {
   origin: function (origin: string | undefined, callback: Function) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
         callback(null, true);
      } else {
         callback(new Error('OSN Not allowed by CORS: ' + origin));
      }
   },
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
};