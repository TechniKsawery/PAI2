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

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Zarządzanie przedmiotami
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Pobierz wszystkie przedmioty
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista przedmiotów
 */
router.get('/', getItems);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Dodaj nowy przedmiot
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Przedmiot utworzony
 */
router.post('/', validateItem, validateItemMiddleware, createItem);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Pobierz pojedynczy przedmiot
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID przedmiotu
 *     responses:
 *       200:
 *         description: Dane przedmiotu
 *       404:
 *         description: Przedmiot nie znaleziony
 */
router.get('/:id', getItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Zaktualizuj przedmiot
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID przedmiotu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Przedmiot zaktualizowany
 *       404:
 *         description: Przedmiot nie znaleziony
 */
router.put('/:id', validateItem, validateItemMiddleware, updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Usuń przedmiot
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID przedmiotu
 *     responses:
 *       200:
 *         description: Przedmiot usunięty
 *       404:
 *         description: Przedmiot nie znaleziony
 */
router.delete('/:id', deleteItem);

export default router;