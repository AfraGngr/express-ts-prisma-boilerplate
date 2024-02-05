import { RequestHandler } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

// We can try to use this usage, so we can do typecheck within whole process

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const data = await userService.getAllUsers(req.query);
        res.status(201).send({ status: 'success', data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        next(err);
    }
};

/**
    {
        status: 'success' | 'fail' | 'error' 
        data : Object[],
        meta: {
            totalCount: totalItems,
            pageCount: totalPages,
            currentPage: page,
        }
        errors: [] // TODO: burada bizden error kodlarını istiyorlar ama bizde invalid input / notfound ve 500 olacak. Onun dışında error yok bunlar için de gerekli mi ? Yani invalid input minValue için diyelim bunları ayrı ayrı yapmaya gerek var mı ? 
    }
 */
