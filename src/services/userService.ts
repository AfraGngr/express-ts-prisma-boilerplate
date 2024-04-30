import { BookReview, BorrowedBook } from '@prisma/client';
import { prisma } from '../config/prisma';
import { TUserFilter } from '../schema/allUsersSchema';
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
            },
            include: {
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
}
