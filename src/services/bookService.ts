import { Book } from '@prisma/client';
import { prisma } from '../config/prisma';
import { TBookFilter, TCreateBook } from '../schema/bookSchema';
import AppError from '../utils/appError';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class BookService {
    constructor() {}

    public getAllBooks = async (filters: TBookFilter): Promise<Book[]> => {
        const { limit, page, categoryId } = filters;
        const whereOptions: { categoryId?: number } = {};
        if (categoryId) whereOptions.categoryId = categoryId;
        const data = await prisma.book.findMany({
            where: whereOptions,
            skip: (page - 1) * limit,
            take: limit,
        });

        return data;
    };

    public getBook = async (bookId: number): Promise<Book> => {
        const data = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
            include: {
                BookReview: {
                    include: {
                        User: true,
                    },
                },
            },
        });

        if (!data) throw new AppError(400, 'Book not found');

        return data;
    };
    public createBook = async (data: TCreateBook) => {
        await prisma.book.create({ data });
        return {};
    };

    public updateBook = async (bookId: number, data: TCreateBook) => {
        await prisma.book.update({
            where: { id: bookId },
            data,
        });

        return {};
    };

    public deleteBook = async (bookId: number) => {
        await prisma.book.delete({ where: { id: bookId } });
        return {};
    };
}
