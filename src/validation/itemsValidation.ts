import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const validateItem = [
  body('name').notEmpty().withMessage('Nazwa jest wymagana'),
  body('description').notEmpty().withMessage('Opis jest wymagany'),
  body('price').isFloat({ min: 0 }).withMessage('Cena musi być liczbą nieujemną')
];


export const validateItemMiddleware = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
