import express, { Express, Request, Response } from 'express';
import ErrorHandler from './middlewares/errorHandler';

export const app: Express = express();

app.use(express.json());

app.all('*', (req: Request, res: Response) => {
    res.status(404).end();
});

app.use(ErrorHandler.convert());
app.use(ErrorHandler.handle());
