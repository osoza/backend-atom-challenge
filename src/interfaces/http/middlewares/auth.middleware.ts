import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/env.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers['authorization']?.split(' ')[1] ? req.headers['authorization']?.split(' ')[1] : req.headers['authorization'];

   if (!token) {
      return res.status(401).json({ done: false, message: 'El token no fue enviado' });
   }

   try {
      (req as any).user = jwt.verify(token, JWT_SECRET);
      next();
   } catch (err) {
      return res.status(403).json({ done: false, message: 'Token inválido' });
   }
};