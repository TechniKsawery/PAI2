import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatePerson = [
  body('firstName')
    .notEmpty().withMessage('Imię jest wymagane')
    .isLength({ min: 2, max: 50 }).withMessage('Imię musi mieć od 2 do 50 znaków'),
  
  body('lastName')
    .notEmpty().withMessage('Nazwisko jest wymagane')
    .isLength({ min: 2, max: 50 }).withMessage('Nazwisko musi mieć od 2 do 50 znaków'),
  
  body('email')
    .notEmpty().withMessage('Email jest wymagany')
    .isEmail().withMessage('Nieprawidłowy format email'),
  
  body('birthDate')
    .optional()
    .isISO8601().withMessage('Nieprawidłowy format daty urodzenia'),
  
  body('phoneNumber')
    .optional()
    .matches(/^\+?[0-9]{9,15}$/).withMessage('Nieprawidłowy format numeru telefonu')
];

export const validatePersonMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ 
      status: 'error',
      message: 'Błąd walidacji',
      errors: errors.array() 
    });
    return;
  }
  next();
}; 