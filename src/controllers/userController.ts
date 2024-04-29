import { RequestHandler } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const data = await userService.getAllUsers(req.query);
        res.status(201).send({ status: 'success', data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        next(err);
    }
};
