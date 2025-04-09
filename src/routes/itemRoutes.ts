import { Router } from 'express';
import { validateItem, validateItemMiddleware } from '../validation/itemsValidation';
import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
} from '../controllers/itemController';

const router = Router();

// Ścieżki dla przedmiotów
router.get('/', getItems);
router.post('/', validateItem, validateItemMiddleware, createItem);
router.get('/:id', getItem);
router.put('/:id', validateItem, validateItemMiddleware, updateItem);
router.delete('/:id', deleteItem);

export default router; 