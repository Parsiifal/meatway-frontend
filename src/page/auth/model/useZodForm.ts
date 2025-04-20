import { useState, useCallback } from "react";
import { ZodError, ZodType } from "zod";

import { FormErrors, TouchedFields, } from "../lib/authValidation";

interface UseZodFormOptions<T> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<void> | void;
}

export function useZodForm<T extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
}: UseZodFormOptions<T>) {

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
        try {
          (schema as any).shape[field].parse(value);
          setErrors((e) => ({ ...e, [field]: undefined }));
        } 
        catch (err) {
          if (err instanceof ZodError) {
            setErrors((e) => ({ ...e, [field]: err.errors[0].message }));
          }
        }
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

        try {
          (schema as any).shape[field].parse(val);
          setErrors((e) => ({ ...e, [field]: undefined }));
        } 
        catch (err) {
          if (err instanceof ZodError) {
            setErrors((e) => ({ ...e, [field]: err.errors[0].message }));
          }
        }
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
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
