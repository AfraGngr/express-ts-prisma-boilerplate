import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';

export const validateParamMiddleware = (
    schema: z.ZodSchema,
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req.params);
            req.params = result;
            next();
        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                next(new Error(err.issues[0].message));
            } else next(new Error(err as unknown as string));
        }
    };
};
