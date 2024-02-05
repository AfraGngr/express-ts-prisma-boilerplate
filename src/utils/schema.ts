import { z } from 'zod';

export type TUserQuery = z.infer<typeof getAllUserSchema>;

export const getAllUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    numberType: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : undefined)),
});
