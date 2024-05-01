import { Router } from 'express';
import {
    borrowBook,
    getAllUsers,
    getProfile,
    getUser,
    rateBook,
    returnBook,
} from '../controllers/userController';
import { validateQueryMiddleware } from '../middlewares/validateQueryMiddleware';
import { validateParamMiddleware } from '../middlewares/validateParamMiddleware';
import {
    userSchema,
    allUsersSchema,
    rateBookSchema,
} from '../schema/userSchema';
import { isAdmin } from '../middlewares/isAdmin';
import { bookSchema } from '../schema/bookSchema';
import { validateBodyMiddleware } from '../middlewares/validateBodyMiddleware';

const router = Router();

router
    .get('/', validateQueryMiddleware(allUsersSchema), isAdmin, getAllUsers)
    .get('/profile', getProfile)
    .get('/:userId', validateParamMiddleware(userSchema), getUser)
    .post('/borrow/:bookId/', validateParamMiddleware(bookSchema), borrowBook)
    .post(
        '/rate/:bookId',
        validateParamMiddleware(bookSchema),
        validateBodyMiddleware(rateBookSchema),
        rateBook,
    )
    .patch('/return/:bookId', validateParamMiddleware(bookSchema), returnBook);

export { router as userRoutes };
