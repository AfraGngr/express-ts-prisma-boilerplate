import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { validateBodyMiddleware } from '../middlewares/validateBodyMiddleware';
import { registerSchema } from '../schema/registerSchema';
import { loginSchema } from '../schema/loginSchema';

const router = Router();

router.post('/register', validateBodyMiddleware(registerSchema), register);
router.post('/login', validateBodyMiddleware(loginSchema), login);

export { router as authRoutes };
