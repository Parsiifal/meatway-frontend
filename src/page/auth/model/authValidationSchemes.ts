import { z } from "zod";

// Базовые валидаторы полей
export const emailSchema = z.string().email("Некорректный ввод почты");

export const passwordSchema = z.string()
  .min(8, "Минимум 8 символов")
  .max(25, "Максимум 25 символов");


// Общая схема для входа и регистрации (без confirmPassword)
export const baseAuthSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Схема входа
export const loginSchema = baseAuthSchema;

// Схема регистрации с подтверждением пароля
export const registrationSchema = baseAuthSchema
  .extend({
    confirmPassword: passwordSchema,
  })
  .refine(
    data => data.password === data.confirmPassword,
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    }
  );


// Формы данных, выводимые из схем
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
