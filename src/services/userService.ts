import { Book, BookReview, BorrowedBook, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { TUserFilter } from '../schema/userSchema';
import AppError from '../utils/appError';

interface IUserDataAdmin {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface IUserData {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    BorrowedBook: BorrowedBook[];
    BookReview: BookReview[];
}

export class UserService {
    constructor() {}

    public getAllUsers = async (
        filters: TUserFilter,
    ): Promise<IUserDataAdmin[]> => {
        const { limit, page } = filters;

        // eslint-disable-next-line no-console
        console.log(limit, page);

        const data = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return data;
    };

    public getUser = async (userId: number): Promise<IUserData> => {
        const data = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                BorrowedBook: {
                    include: {
                        book: true,
                    },
                },
                BookReview: true,
            },
        });

        if (!data) throw new AppError(400, 'User not found');

        return data;
    };

    public getProfile = async (userId: number): Promise<IUserData> => {
        const data = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                BorrowedBook: {
                    include: {
                        book: true,
                    },
                },
                BookReview: true,
            },
        });

        if (!data) throw new AppError(400, 'User not found');

        return data;
    };

    public borrowBook = async (
        userId: number,
        bookId: number,
    ): Promise<Book> => {
        try {
            const book = await prisma.book.update({
                where: { id: bookId },
                data: {
                    borrowed: true,
                    BorrowedBook: {
                        create: {
                            userId,
                            borrowDate: new Date(),
                        },
                    },
                },
            });

            return book;
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (
                    err.message.includes(
                        'An operation failed because it depends on one or more records that were required but not found',
                    )
                )
                    throw new AppError(400, 'The Book cannot be found');

                if (
                    err.code === 'P2002' &&
                    err.meta &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    err.meta.target.includes('user_id') &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    err.meta.target.includes('book_id')
                ) {
                    throw new AppError(
                        400,
                        "You've already borrowed this book",
                    );
                }
            }
            throw err;
        }

        // eslint-disable-next-line no-console
    };

    public returnBook = async (userId: number, bookId: number) => {
        // When user returns book, book table 'borrowed' column will be updated
        bookId;
        userId;
    };

    public rateBook = async (userId: number, bookId: number) => {
        // When user rates book, book table's rating column will be update
        // Just user who borrows the book can rate
        bookId;
    };
}
