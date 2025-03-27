import { body, validationResult } from 'express-validator';
import type { RequestHandler } from 'express';

const validateItemMiddleware = ((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}) as unknown as RequestHandler;

export const validateItem = [
  body('name').notEmpty().withMessage('Nazwa jest wymagana'),
  body('description').notEmpty().withMessage('Opis jest wymagany'),
  body('price').isNumeric().withMessage('Cena musi być liczbą').isFloat({ min: 0 }).withMessage('Cena nie może być ujemna'),
  validateItemMiddleware
];
