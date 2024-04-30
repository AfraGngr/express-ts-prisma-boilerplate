/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { UserService } from '../services/userService';
import catchAsync from '../utils/catchAsync';
import { TUserFilter } from '../schema/allUsersSchema';
import { TUser } from '../schema/userSchema';

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
