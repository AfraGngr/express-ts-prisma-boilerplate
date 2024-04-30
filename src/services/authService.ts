import { Role, User } from '@prisma/client';
import { prisma } from '../config/prisma';
import { TRegister } from '../schema/registerSchema';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';
import AppError from '../utils/appError';
import { TLogin } from '../schema/loginSchema';
import bcrypt from 'bcrypt';

const key = scryptSync(process.env.SESSION_ENCRYPT_SECRET!, 'salt', 24);
const iv = Buffer.alloc(16, 0); // Initialization crypto vector

export interface ICookieConfigOptions {
    expires: Date;
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
}

export interface ICookieData {
    session: string | undefined;
    config: ICookieConfigOptions | undefined;
}

export interface ISessionData {
    id: number;
    role: Role;
}

export class AuthService {
    constructor() {}

    public registerUser = async (
        req: Request,
        data: TRegister,
    ): Promise<ICookieData> => {
        const newUser = await prisma.user.create({ data });

        const { session, config } = await this.createSession(req, newUser);

        return { session, config };
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public login = async (req: Request, data: TLogin): Promise<ICookieData> => {
        const { email, password } = data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new AppError(400, 'Yanlış şifre veya email');

        const passwordMatches = bcrypt.compareSync(password, user.password);

        if (!passwordMatches)
            throw new AppError(400, 'Yanlış şifre veya email');

        return await this.createSession(req, user);
    };

    public checkSession = async (session: string): Promise<ISessionData> => {
        const token = this.decrypt(session);
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SESSION_SECRET!,
        ) as jwt.JwtPayload;

        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id,
            },
            select: { id: true, role: true },
        });

        if (!user) throw new AppError(401, 'User not found!');

        return user;
    };

    private createSession = async (
        req: Request,
        user: User,
    ): Promise<ICookieData> => {
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

        const config: ICookieConfigOptions = {
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
