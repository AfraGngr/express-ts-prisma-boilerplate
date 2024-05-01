/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { BookService } from '../services/bookService';
import { TBookFilter, TCreateBook, TUpdateBook } from '../schema/bookSchema';

const bookService = new BookService();

export const getAllBooks: RequestHandler = catchAsync(async (req, res) => {
    const data = await bookService.getAllBooks(
        req.query as unknown as TBookFilter,
    );
    res.status(200).send({ status: 'scuccess', data });
});
export const getBook: RequestHandler = catchAsync(async (req, res) => {
    const data = await bookService.getBook(+req.params.bookId);
    res.status(200).send({ status: 'scuccess', data });
});
export const createBook: RequestHandler<any, any, TCreateBook> = catchAsync(
    async (req, res) => {
        const data = await bookService.createBook(req.body);
        res.status(201).send({ status: 'scuccess', data });
    },
);
export const updateBook: RequestHandler<any, any, TUpdateBook> = catchAsync(
    async (req, res) => {
        await bookService.updateBook(+req.params.bookId, req.body);
        res.status(204);
    },
);
export const deleteBook: RequestHandler = catchAsync(async (req, res) => {
    await bookService.deleteBook(+req.params.bookId);
    res.status(204);
});
