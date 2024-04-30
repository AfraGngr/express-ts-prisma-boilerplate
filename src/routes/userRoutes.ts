import { Router } from 'express';
import { cookieSchema } from '../schema/cookieSchema';
import { validateCookieMiddleware } from '../middlewares/validateCookieMiddleware';

const router = Router();

router.get('/', validateCookieMiddleware(cookieSchema));

export { router as userRoutes };
