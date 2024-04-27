import { Router } from 'express';
import { validateQueryMiddleware } from '../middlewares/validateMiddleware';
import { getAllUserSchema } from '../utils/schema';
import { getAllUsers } from '../controllers/userController';

const router = Router();

router.get('/users', validateQueryMiddleware(getAllUserSchema), getAllUsers);

export { router as authRoutes };
