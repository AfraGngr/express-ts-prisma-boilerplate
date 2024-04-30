/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { AuthService } from '../services/authService';
import { TRegister } from '../schema/registerSchema';
import { TLogin } from '../schema/loginSchema';

const authService = new AuthService();

export const register: RequestHandler<any, any, TRegister> = catchAsync(
    async (req, res) => {
        const { session, config } = await authService.registerUser(
            req,
            req.body,
        );
        res.status(201)
            .cookie(process.env.SESSION_NAME!, session!, config!)
            .send({ status: 'success', data: {} });
    },
);
export const login: RequestHandler<any, any, TLogin> = catchAsync(
    async (req, res) => {
        const { session, config } = await authService.login(req, req.body);
        res.status(200)
            .cookie(process.env.SESSION_NAME!, session!, config!)
            .send({ status: 'success', data: {} });
    },
);
