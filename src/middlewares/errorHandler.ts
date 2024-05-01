/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { Prisma } from '@prisma/client';

export default class ErrorHandler {
    static convert = () => {
        return async (
            err: any,
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            let error = err;
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003')
                    error.message = `Foreign key constraint failed on the field: ${error.meta?.field_name} `;
            }

            if (!(error instanceof AppError)) {
                switch (error.name) {
                    case 'JsonWebTokenError':
                        error.message = 'Invalid session. Please log in again.';
                        error.statusCode = httpStatus.UNAUTHORIZED;
                        break;
                    case 'TokenExpiredError':
                        error.message = 'Session expired. Please log in again.';
                        error.statusCode = httpStatus.UNAUTHORIZED;
                        break;
                    case 'NotBeforeError':
                        error.message =
                            'Session not active. Please log in again.';
                        error.statusCode = httpStatus.UNAUTHORIZED;
                        break;
                    case 'AxiosError':
                        error.statusCode =
                            error?.response?.data?.error?.statusCode ||
                            httpStatus.INTERNAL_SERVER_ERROR;
                        error.message =
                            error?.response?.data?.message ||
                            httpStatus[
                                error.statusCode as keyof typeof httpStatus
                            ] ||
                            'Something went wrong';
                        error.isOperational = false;
                        break;
                    default:
                        error.statusCode =
                            error.statusCode ||
                            httpStatus.INTERNAL_SERVER_ERROR;
                        error.message =
                            error.message ||
                            httpStatus[
                                error.statusCode as keyof typeof httpStatus
                            ];
                        error.isOperational = false;
                        break;
                }
                // recreate the error object with the new arguments
                error = new AppError(
                    error.statusCode,
                    error.message,
                    error.isOperational,
                    error.name,
                    error.stack,
                );
            }
            // pass the error to the actual error handler middleware
            next(error);
        };
    };

    static handle = () => {
        return async (
            err: AppError,
            req: Request,
            res: Response,
            _next: NextFunction,
        ) => {
            // clear cookie if authorized
            // if (err.statusCode === 401) res.clearCookie(SESSION_NAME) //TODO:burayı process den çekicez
            if (process.env.NODE_ENV === 'production') {
                this.sendErrorProd(err, req, res);
            } else {
                this.sendErrorDev(err, res);
            }
        };
    };

    private static sendErrorDev = (err: AppError, res: Response) => {
        // 1) log error to console
        console.log(
            `💥💥💥💥💥💥💥💥💥💥💥💥💥${err.name}💥💥💥💥💥💥💥💥💥💥💥💥💥`,
        );
        console.log('headersSent: ?', res.headersSent);
        console.log('isOperational: ?', err.isOperational);
        console.log(err.message);
        console.log('-------------stack----------------');
        console.log(err.stack);
        console.log(
            '💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥',
        );

        // 2) send error message to client
        if (res.headersSent) return;
        res.status(err.statusCode).send({
            status: err.status,
            error: err,
            name: err.name,
            message: err.message,
            stack: err.stack,
        });
    };

    private static sendErrorProd = (
        err: AppError,
        req: Request,
        res: Response,
    ) => {
        // console.log(err)
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            // check if the headers is sent
            if (res.headersSent) {
                console.log(
                    `💥💥💥💥💥💥💥💥💥💥💥💥💥${err.name}💥💥💥💥💥💥💥💥💥💥💥💥💥`,
                );
                console.log('headersSent: ?', res.headersSent);
                console.log('isOperational: ?', err.isOperational);
                console.log(err.message);
                console.log('-------------stack----------------');
                console.log(err.stack);
                console.log(
                    '💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥',
                );
            } else {
                res.status(err.statusCode).send({
                    status: err.status,
                    message: err.message,
                });
            }
            // Programming or other unknown error: don't leak error details
        } else {
            console.log(
                `💥💥💥💥💥💥💥💥💥💥💥💥💥${err.name}💥💥💥💥💥💥💥💥💥💥💥💥💥`,
            );
            console.log('headersSent: ?', res.headersSent);
            console.log('isOperational: ?', err.isOperational);
            console.log(err.message);
            console.log('-------------stack----------------');
            console.log(err.stack);
            console.log(
                '💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥',
            );
            // check if the headers is sent
            if (!res.headersSent) {
                // send generic message
                res.status(500).send({
                    status: 'error',
                    message: 'Something went very wrong!',
                });
            }
        }
    };
}
