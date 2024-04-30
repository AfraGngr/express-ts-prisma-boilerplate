import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';

export const validateQueryMiddleware = (
    schema: z.ZodSchema,
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req.query);
            req.query = result;
            next();
        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                next(new Error(err.issues[0].message));
            } else next(new Error(err as unknown as string));
        }
    };
};
