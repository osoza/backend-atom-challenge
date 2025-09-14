import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const CORS_ORIGIN = process.env.CORS_ORIGIN ||
   'http://localhost:4200,http://localhost:5000,https://atom-challenge-frontend.web.app';