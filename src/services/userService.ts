import { User } from '@prisma/client';
import { prisma } from '../config/prisma';
import { TUserFilter } from '../schema/allUsersSchema';
import AppError from '../utils/appError';

interface IUserData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export class UserService {
    constructor() {}

    public getAllUsers = async (filters: TUserFilter): Promise<IUserData[]> => {
        const { limit, page } = filters;

        // eslint-disable-next-line no-console
        console.log(limit, page);

        const data = await prisma.user.findMany({
            select: {
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

    public getUser = async (userId: number): Promise<User> => {
        const data = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                borrowedBook: {
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
