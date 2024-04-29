import { Router } from 'express';
import { register } from '../controllers/authController';
import { validateBodyMiddleware } from '../middlewares/validateBodyMiddleware';
import { registerSchema } from '../schema/registerSchema';

const router = Router();

router.get('/register', validateBodyMiddleware(registerSchema), register);

export { router as authRoutes };
