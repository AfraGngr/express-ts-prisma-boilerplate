import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';
import AppError from '../utils/appError';

export const validateBodyMiddleware = (schema: z.ZodSchema): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req.body);
            req.body = result;
            next();
        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                next(new AppError(400, err.issues[0].message));
            } else next(new Error(err as unknown as string));
        }
    };
};
