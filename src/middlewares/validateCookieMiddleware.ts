/* eslint-disable no-console */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';
import AppError from '../utils/appError';
import { ISessionData } from '../services/authService';

export const validateCookieMiddleware = (
    schema: z.ZodSchema,
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const cookie = req.cookies[process.env.SESSION_NAME!];
        if (!cookie) throw new AppError(401, 'Unauthorized');
        try {
            const result = (await schema.parseAsync(
                req.cookies,
            )) as unknown as ISessionData;

            console.log({ result });
            req.userId = result.id;
            req.role = result.role;
            next();
        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                next(new Error(err.issues[0].message));
            } else next(new Error(err as unknown as string));
        }
    };
};
