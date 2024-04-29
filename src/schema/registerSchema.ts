import { z } from 'zod';

export type TRegister = z.infer<typeof registerSchema>;

export const registerSchema = z
    .object({
        firstName: z
            .string({
                required_error: 'First name is required.',
                invalid_type_error: 'You must enter a valid name.',
            })
            .min(2, {
                message: 'First name must contain at least 2 characters.',
            })
            .max(30),
        lastName: z
            .string({
                required_error: 'Last name is required.',
                invalid_type_error: 'You must enter a valid name',
            })
            .min(2, {
                message: 'Last name must contain at least 2 characters.',
            })
            .max(30),

        email: z
            .string({ required_error: 'Email is required.' })
            .email('Please enter a valid email.'),

        password: z
            .string({ required_error: 'Password is required !' })
            .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
            .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
            .regex(new RegExp('.*\\d.*'), 'One number')
            .regex(
                new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
                'One special character',
            )
            .min(8, 'Must be at least 8 characters in length'),

        confirmPassword: z.string({
            required_error: 'Confirm Password is required !',
        }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password and ConfirmPassword does not match',
            });
        }
    });
