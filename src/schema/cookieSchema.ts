import { z } from 'zod';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const cookieSchema = z
    .object({
        sid: z.string(),
    })
    .transform(async (data) => {
        return await authService.checkSession(data.sid);
    });
