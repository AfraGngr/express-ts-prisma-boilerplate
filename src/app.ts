import express, { Express, NextFunction, Request, Response } from 'express';

export const app: Express = express();

app.use('/', (_req: Request, res: Response) => {
    res.json({
        message: 'Haloooo !',
    });
});

// TODO: Replace here with error handler middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    let message: string = 'Something went wrong';
    let statusCode: number = 500;
    let status: string = 'error';

    if (err instanceof Error) {
        message = err.message;
        statusCode = 400;
        status = 'fail';
    }

    /* eslint-disable */
    console.log(message);

    res.status(statusCode).send({ status, message });
});
