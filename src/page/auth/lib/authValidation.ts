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


// Типы, выводимые из схем
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Общие типы ошибок и трекера "потроганных" полей
export type FormErrors<T> = Partial<Record<keyof T, string>> & {general?: string;};
export type TouchedFields<T> = Partial<Record<keyof T, boolean>>;


// Утилита для валидации одного поля
export const validateField = <Schema extends z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>>(
  schema: Schema,
  fieldName: keyof z.infer<Schema>,
  value: unknown
): string | undefined => {

  // Извлекаем «чистую» схему объекта без эффектов
  const coreSchema = schema instanceof z.ZodEffects ? (schema as z.ZodEffects<z.ZodObject<any>>).innerType() : schema;

  if (!(coreSchema instanceof z.ZodObject)) return "Неверная схема валидации";

  // Достаём нужную под‑схему поля
  const fieldSchema = coreSchema.shape[fieldName];
  if (!fieldSchema) return "Неизвестное поле для валидации";

  try {
    fieldSchema.parse(value);
    return undefined;
  } 
  catch (err) {
    if (err instanceof z.ZodError) return err.errors[0].message;
    return "Ошибка валидации";
  }
};
