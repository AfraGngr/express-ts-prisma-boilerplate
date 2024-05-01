import { Router } from 'express';
import { validateQueryMiddleware } from '../middlewares/validateQueryMiddleware';
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBook,
    updateBook,
} from '../controllers/bookController';
import { validateParamMiddleware } from '../middlewares/validateParamMiddleware';
import {
    allBooksSchema,
    bookSchema,
    createBookSchema,
    updateBookSchema,
} from '../schema/bookSchema';
import { validateBodyMiddleware } from '../middlewares/validateBodyMiddleware';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.get('/', validateQueryMiddleware(allBooksSchema), getAllBooks);
router.post('/', isAdmin, validateBodyMiddleware(createBookSchema), createBook);
router.get('/:bookId', validateParamMiddleware(bookSchema), getBook);
router.patch(
    '/:bookId',
    isAdmin,
    validateParamMiddleware(bookSchema),
    validateBodyMiddleware(updateBookSchema),
    updateBook,
);
router.delete(
    '/:bookId',
    isAdmin,
    validateParamMiddleware(bookSchema),
    deleteBook,
);

export { router as bookRoutes };
