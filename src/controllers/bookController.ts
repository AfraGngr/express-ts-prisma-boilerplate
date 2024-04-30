/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { TRegister } from '../schema/registerSchema';
import { BookService } from '../services/bookService';
import { TBookFilter } from '../schema/bookSchema';

const bookService = new BookService();

export const getAllBooks: RequestHandler = catchAsync(
    async (req, res) => {
        const data = await bookService.getAllBooks(req.query as unknown as TBookFilter);
        res.status(200).send({ status: 'scuccess', data });
    },
);
export const getBook: RequestHandler<any, any, TRegister> = catchAsync(
    async (req, res) => {
        const data = await bookService.getBook(+req.params.bookId);
        res.status(200).send({ status: 'scuccess', data });
    },
);
export const createBook: RequestHandler<any, any, TRegister> = catchAsync(
    async (req, res) => {
        const data = await bookService.createBook(req.body);
        res.status(200).send({ status: 'scuccess', data });
    },
);
export const updateBook: RequestHandler<any, any, TRegister> = catchAsync(
    async (req, res) => {
        const data = await bookService.updateBook(+req.params.id, req.query);
        res.status(200).send({ status: 'scuccess', data });
    },
);
export const deleteBook: RequestHandler<any, any, TRegister> = catchAsync(
    async (req, res) => {
        const data = await bookService.deleteBook(+req.params.id);
        res.status(200).send({ status: 'scuccess', data });
    },
);
