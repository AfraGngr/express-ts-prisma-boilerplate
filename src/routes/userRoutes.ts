import { Router } from 'express';
import { getAllUsers, getUser } from '../controllers/userController';
import { validateQueryMiddleware } from '../middlewares/validateQueryMiddleware';
import { allUsersSchema } from '../schema/allUsersSchema';
import { validateParamMiddleware } from '../middlewares/validateParamMiddleware';
import { userSchema } from '../schema/userSchema';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router
    .get('/', validateQueryMiddleware(allUsersSchema), isAdmin, getAllUsers)
    .get('/:userId', validateParamMiddleware(userSchema), getUser);

export { router as userRoutes };
