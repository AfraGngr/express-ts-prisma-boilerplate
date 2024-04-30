import { RequestHandler } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const isAdmin: RequestHandler = catchAsync(async (req, _res, next) => {
    if (req.role !== 'Admin') throw new AppError(403, 'Forbidden');
    next();
});
