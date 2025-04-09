import { Router } from 'express';
import { validatePerson } from '../validation/personsValidation';
import { validatePersonMiddleware } from '../validation/personsValidation';
import {
  createPerson,
  getPersons,
  getPerson,
  updatePerson,
  deletePerson
} from '../controllers/personController';

const router = Router();

router
  .route('/')
  .get(getPersons)
  .post(validatePerson, validatePersonMiddleware, createPerson);

router
  .route('/:id')
  .get(getPerson)
  .put(validatePerson, validatePersonMiddleware, updatePerson)
  .delete(deletePerson);

export default router; 