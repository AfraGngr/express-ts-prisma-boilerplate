import { z } from 'zod';

export type TUser = z.infer<typeof userSchema>;

export const userSchema = z.object({
    userId: z.string(),
});
