import { z } from 'zod';

export type TRegisterRequest = z.infer<typeof getUserSchema>;

export const getUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    numberType: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : undefined)),
});
