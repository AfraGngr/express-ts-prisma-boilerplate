import { z } from 'zod';

export type TUser = z.infer<typeof userSchema>;
export type TUserFilter = z.infer<typeof allUsersSchema>;
export type TRate = z.infer<typeof rateBookSchema>;

export const allUsersSchema = z
    .object({
        limit: z
            .string()
            .optional()
            .default('5')
            .transform((arg) => Number(arg)),
        page: z
            .string()
            .optional()
            .default('1')
            .transform((arg) => Number(arg)),
    })
    .strict();

export const userSchema = z.object({
    userId: z.string(),
});

export const rateBookSchema = z.object({
    rate: z.number().min(1).max(5),
    review: z.string().max(100, { message: 'Review must be 100 char long.' }),
});
