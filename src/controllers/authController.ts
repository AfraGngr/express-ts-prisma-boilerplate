/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { AuthService } from '../services/authService';
import { TRegister } from '../schema/registerSchema';

const authService = new AuthService();

export const register: RequestHandler<any, any, TRegister> = catchAsync(
    async (req, res) => {
        const { session, config } = await authService.registerUser(
            req,
            req.body,
        );
        res.status(200)
            .cookie('session', session!, config!)
            .send({ status: 'success', data: {} });
    },
);
