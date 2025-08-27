import { z } from 'zod';
export const registerFormSchema = z.object({
    name: z.string().min(2, 'Имя пользователя слишком короткое').max(20, 'Имя пользователя слишком длинное'),
    email: z.email('Некорректный email'),
    password: z.string().min(6, 'Минимум 6 знаков'),
});

export const loginFormSchema = z.object({
    name: z.string().min(4, "Имя должно содержать не менее 4 символов"),
    password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
});

export const forgotPasswordSchema = z.object({
    email: z.email('Некорректный email'),
})

export const dreamCreateSchema = z.object({
    title: z.string().min(1, 'Название не может быть пустым').max(50),
    content: z.string().min(1, 'Содержание не может быть пустым'),
    published: z.boolean().optional(),
});

export type DreamCreateSchema = z.input<typeof dreamCreateSchema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>