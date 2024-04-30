import { Role } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            userId?: number;
            role?: Role;
        }
    }
}

export {};
