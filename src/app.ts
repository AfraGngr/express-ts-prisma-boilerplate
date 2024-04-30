import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middlewares/errorHandler';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';

export const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.all('*', (req: Request, res: Response) => {
    res.status(404).end();
});

app.use(ErrorHandler.convert());
app.use(ErrorHandler.handle());
