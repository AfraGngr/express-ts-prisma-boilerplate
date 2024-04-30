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
} from '../schema/bookSchema';
import { validateBodyMiddleware } from '../middlewares/validateBodyMiddleware';

const router = Router();

router.get('/', validateQueryMiddleware(allBooksSchema), getAllBooks);
router.post('/',  validateBodyMiddleware(createBookSchema), createBook);
router.get('/:bookId', validateParamMiddleware(bookSchema), getBook);
router.patch(
    '/:bookId',
    validateParamMiddleware(bookSchema),
    validateBodyMiddleware(createBookSchema),
    updateBook,
);
router.delete('/:bookId', validateParamMiddleware(bookSchema), deleteBook);

export { router as bookRoutes };
