/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { UserService } from '../services/userService';
import catchAsync from '../utils/catchAsync';
import { TUser, TUserFilter } from '../schema/userSchema';

const userService = new UserService();

export const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
    const data = await userService.getAllUsers(
        req.query as unknown as TUserFilter,
    );
    res.status(200).send({ status: 'success', data });
});

export const getUser: RequestHandler<TUser> = catchAsync(async (req, res) => {
    const data = await userService.getUser(+req.params.userId);
    res.status(200).send({ status: 'success', data });
});

export const getProfile: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const data = await userService.getProfile(req.userId as number);
        res.status(200).send({ status: 'success', data });
    },
);
export const borrowBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const data = await userService.borrowBook(
            req.userId!,
            +req.params.bookId,
        );
        res.status(200).send({ status: 'success', data });
    },
);
export const returnBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const data = await userService.returnBook(
            req.userId!,
            +req.params.bookId,
        );
        res.status(200).send({ status: 'success', data });
    },
);
export const rateBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const data = await userService.rateBook(
            req.userId!,
            +req.params.bookId,
        );
        res.status(200).send({ status: 'success', data });
    },
);
