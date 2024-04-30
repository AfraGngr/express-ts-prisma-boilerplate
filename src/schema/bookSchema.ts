import { z } from 'zod';

export type TBook = z.infer<typeof bookSchema>;
export type TBookFilter = z.infer<typeof allBooksSchema>;
export type TCreateBook = z.infer<typeof createBookSchema>;

export const allBooksSchema = z
    .object({
        categoryId: z
            .string()
            .optional()
            .transform((arg) => arg && Number(arg)),
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

export const bookSchema = z.object({
    bookId: z.string(),
});

export const createBookSchema = z.object({
    title: z.string(),
    summary: z.string(),
    author: z.string(),
    categoryId: z.string().transform((arg) => Number(arg)),
});
