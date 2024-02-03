import express, { Express, Request, Response } from 'express';

export const app: Express = express();

app.use('/', (_req: Request, res: Response) => {
    res.json({
        message: 'Haloooo !',
    });
});
