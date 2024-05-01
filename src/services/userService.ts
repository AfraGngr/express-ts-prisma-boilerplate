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
            const isBorrowed = await prisma.borrowedBook.findFirst({
                where : { 
                    bookId,
                    returnDate : null
                }
            })

            if(isBorrowed && userId !== isBorrowed.userId) throw new AppError(400, 'The book has already borrowed by someone else') 
            if(isBorrowed && userId === isBorrowed.userId) throw new AppError(400, "You've already borrowed this book") 


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
                if(err.code === 'P2025') throw new AppError(400, 'Book is not found.')
                // if(err.code === 'P2022') throw new AppError(400, "You've already borrowed this book")
            }
            throw err;
        }
    };

    public returnBook = async (
        userId: number,
        bookId: number,
    ): Promise<Book> => {
        try{
        const isBorrowed = await prisma.borrowedBook.findUnique({
            where : {
                bookId_userId: {
                    userId,
                    bookId
                }
            },
            select: { returnDate: true}
        })

        if(isBorrowed && isBorrowed.returnDate) throw new AppError(400, `You've already returned this book`)

        const book = await prisma.book.update({
            where: { id: bookId },
            data: {
                borrowed: false,
                BorrowedBook: {
                    update: {
                        where: {
                            bookId_userId: {
                                userId: userId,
                                bookId: bookId,
                            },
                        },
                        data: {
                            returnDate: new Date()
                        },
                    },
                },
            },
        });
        return book;
    }
    catch(err) {
        if(err instanceof Prisma.PrismaClientKnownRequestError) {
            // eslint-disable-next-line no-console
            if(err.code === 'P2025') throw new AppError(400, 'You did not borrow this book')
        }
        throw err
    }
    };

    public rateBook = async (userId: number, bookId: number) => {
        // When user rates book, book table's rating column will be update
        // Just user who borrows the book can rate
        bookId;
    };

}
