import { z } from 'zod';

export type TLogin = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required.' })
        .email('Please enter a valid email.'),
    password: z.string({ required_error: 'Password is required !' }),
});
