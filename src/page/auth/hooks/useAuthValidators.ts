import { useState, useCallback } from "react";
import { z, ZodError } from "zod";

// Общие типы ошибок и трекера "потроганных" полей
type FormErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>> & {general?: string;};
type TouchedFields<T extends Record<string, unknown>> = Partial<Record<keyof T, boolean>>;

interface UseAuthValidatorsOptions<T extends Record<string, unknown>> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<void> | void;
}


export function useAuthValidators<T extends Record<string, unknown>>({
  schema,
  defaultValues,
  onSubmit,
}: UseAuthValidatorsOptions<T>) {

  const [formData, setFormData] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<TouchedFields<T>>({});


  // Валидация при изменении поля
  const handleChange = useCallback(
    (field: keyof T, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Сбрасываем ошибку и тронутость при пустом поле
      if (value === "") {
        setErrors((e) => ({ ...e, [field]: undefined }));
        setTouched((t) => ({ ...t, [field]: false }));
        return;
      }

      // Валидируем только если поле было "тронуто" и значение не пустое
      if (touched[field]) {
        const error = validateField(schema, field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    },
    [schema, touched]
  );


  // Валидация при потере фокуса
  const handleBlur = useCallback(
    (field: keyof T) => {
      const val = formData[field];
      // Помечаем как тронутое только если значение не пустое
      if (typeof val === "string" && val.trim() !== "") {
        setTouched((t) => ({ ...t, [field]: true }));
        const error = validateField(schema, field, formData[field]);
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }, 
    [formData, schema]
  );


  // Валидация формы при отправке
  const validateForm = useCallback(() => {
    // Помечаем все поля как тронутые при отправке
    setTouched(
      Object.keys(defaultValues).reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {} as TouchedFields<T>
      )
    );

    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } 
    catch (err) 
    {
      if (err instanceof ZodError) {
        
        const partialErrors: Partial<Record<keyof T, string>> = {};

        err.errors.forEach(({ path, message }) => {
          const key = path[0] as keyof T;
          partialErrors[key] = message;
        });

        setErrors(partialErrors as FormErrors<T>);
      }
      return false;
    }
  }, [defaultValues, formData, schema]);


  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      await onSubmit(formData);
    },
    [formData, onSubmit, validateForm]
  );

  return {
    formData,
    errors,
    touched,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit
  };
}


// Функция для валидации одного поля
const validateField = <T extends Record<string, unknown>>(
  schema: z.ZodType<T>,
  fieldName: keyof T,
  value: unknown
): string | undefined => {

  // Извлекаем «чистую» схему объекта без эффектов
  const coreSchema = schema instanceof z.ZodEffects ? schema.innerType() : schema;

  if (!(coreSchema instanceof z.ZodObject)) return "Неверная схема валидации";

  // Достаём нужную под‑схему поля
  const fieldSchema = coreSchema.shape[fieldName as keyof typeof coreSchema.shape];
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