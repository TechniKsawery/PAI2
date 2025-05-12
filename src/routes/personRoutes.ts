import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  register,
  login,
  getMe,
  updateMe,
  deleteMe
} from '../controllers/personsController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', getMe);
router.put('/me', updateMe);
router.delete('/me', deleteMe);

export default router; 