import express from 'express';
import { createItem, getItems, getItem, updateItem, deleteItem } from '../controllers/itemController';
import { validateRequest } from '../middleware/validateRequest';
import { createItemSchema, updateItemSchema } from '../validators/itemValidators';

const router = express.Router();

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Utwórz nowy przedmiot
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 maxLength: 1000
 *               price:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Przedmiot został utworzony
 *       400:
 *         description: Nieprawidłowe dane wejściowe
 */
router.post('/', validateRequest(createItemSchema), createItem);

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
 * /api/items/{id}:
 *   get:
 *     summary: Pobierz pojedynczy przedmiot
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Szczegóły przedmiotu
 *       404:
 *         description: Przedmiot nie został znaleziony
 */
router.get('/:id', getItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Aktualizuj przedmiot
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 maxLength: 1000
 *               price:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Przedmiot został zaktualizowany
 *       404:
 *         description: Przedmiot nie został znaleziony
 *       400:
 *         description: Nieprawidłowe dane wejściowe
 */
router.put('/:id', validateRequest(updateItemSchema), updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Usuń przedmiot
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Przedmiot został usunięty
 *       404:
 *         description: Przedmiot nie został znaleziony
 */
router.delete('/:id', deleteItem);

export default router;