import { User } from '@prisma/client';
import { prisma } from '../config/prisma';
import { TRegister } from '../schema/registerSchema';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';
import AppError from '../utils/appError';

const key = scryptSync(process.env.SESSION_ENCRYPT_SECRET!, 'salt', 24);
const iv = Buffer.alloc(16, 0); // Initialization crypto vector

export interface CookieConfigOptions {
    expires: Date;
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
}

export interface CookieData {
    session: string | undefined;
    config: CookieConfigOptions | undefined;
}

export class AuthService {
    constructor() {}

    public registerUser = async (
        req: Request,
        data: TRegister,
    ): Promise<CookieData> => {
        const newUser = await prisma.user.create({ data });

        const { session, config } = await this.createSession(req, newUser);

        return { session, config };
    };

    private createSession = async (
        req: Request,
        user: User,
    ): Promise<CookieData> => {
        const data = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(data, process.env.JWT_SESSION_SECRET!, {
            expiresIn: process.env.JWT_SESSION_EXPIRY!,
        });
        const session = this.encrypt(token);
        // create a cookie expiry date in compatible w jwt lifetime
        const expiry = new Date(
            Date.now() +
                24 *
                    60 *
                    60 *
                    1000 *
                    +process.env.JWT_SESSION_EXPIRY!.slice(0, -1) +
                1000,
        );

        const config: CookieConfigOptions = {
            expires: expiry,
            httpOnly: true,
            secure:
                true ||
                req.secure ||
                req.headers['x-forwarded-proto'] === 'https',
            sameSite:
                process.env.NODE_ENV === 'development' ? 'none' : 'strict',
        };

        return { session, config };
    };

    private encrypt = (token: string) => {
        const cipher = createCipheriv(process.env.SESSION_ALGORITHM!, key, iv);
        let encrypted = cipher.update(token, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    };

    private decrypt = (session: string) => {
        try {
            const decipher = createDecipheriv(
                process.env.SESSION_ALGORITHM!,
                key,
                iv,
            );
            let decrypted = decipher.update(session, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            throw new AppError(401, 'Unauthorized');
        }
    };
}
