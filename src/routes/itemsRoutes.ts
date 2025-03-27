import express from 'express';
import { createItem, getItems, getItem, updateItem, deleteItem } from '../controllers/itemController';
import { validateItem } from '../validation/itemsValidation';

const router = express.Router();

router.post('/', validateItem, createItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', validateItem, updateItem);
router.delete('/:id', deleteItem);

export default router;