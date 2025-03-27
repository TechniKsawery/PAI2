import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateItem = [
  body('name').notEmpty().withMessage('Nazwa jest wymagana'),
  body('description').notEmpty().withMessage('Opis jest wymagany'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
