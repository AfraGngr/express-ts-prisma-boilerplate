import { z } from 'zod';

export type TUserFilter = z.infer<typeof allUsersSchema>;

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
