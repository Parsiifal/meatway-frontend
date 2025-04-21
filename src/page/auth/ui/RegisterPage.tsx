// app/register/page.tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Form, Input, Button } from "@heroui/react";
import Link from "next/link";
import { GridDev } from "./GridDev";

import {
  registrationSchema,
  RegistrationFormData,
  FormErrors,
  TouchedFields,
  validateField,
} from "../lib/authValidation";

import { useZodForm } from "../model/useZodForm";

// Схема валидации
// const baseSchema = z.object({
//   email: z.string().email("Некорректный ввод почты"),
//   password: z.string()
//     .min(8, "Минимум 8 символов")
//     .max(25, "Максимум 25 символов"),
//   confirmPassword: z.string()
//     .min(8, "Минимум 8 символов")
//     .max(25, "Максимум 25 символов"),
// });

// const signUpSchema = baseSchema.refine(
//   data => data.password === data.confirmPassword,
//   {
//     message: "Пароли не совпадают",
//     path: ["confirmPassword"]
//   }
// );

//type FormData = z.infer<typeof signUpSchema>;
//type FormErrors = Partial<Record<keyof FormData, string>> & { general?: string };
// Добавляем состояние для отслеживания "тронутых" полей
//type TouchedFields = Partial<Record<keyof FormData, boolean>>;

// // Исправленная функция валидации
// const validateField = (
//   schema: z.ZodEffects<any> | z.ZodObject<any>,
//   fieldName: keyof FormData,
//   value: string
// ): string | undefined => {
//   try {
//     const baseSchema = schema instanceof z.ZodEffects 
//       ? schema.innerType() 
//       : schema;

//     if (!(baseSchema instanceof z.ZodObject)) {
//       return "Неверная схема валидации";
//     }

//     const fieldSchema = baseSchema.pick({ [fieldName]: true });
//     fieldSchema.parse({ [fieldName]: value });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return error.errors[0].message;
//     }
//     return "Ошибка валидации";
//   }
// };

export const RegisterPage = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  // const [errors, setErrors] = useState<FormErrors<RegistrationFormData>>({});
  
  

  // const [formData, setFormData] = useState<RegistrationFormData>({
  //   email: "",
  //   password: "",
  //   confirmPassword: ""
  // });

  // const [touched, setTouched] = useState<TouchedFields<RegistrationFormData>>({});

  const toggleVisibility = () => setIsVisible(!isVisible);

  /* 
  Если ввод с пустого поля, то валидация применяется только при потере фокуса. 
  А если изменение уже введенных данных, ошибочных или корректных, то применяется валидация при изменении,
  так как поле сохраняет статус "в фокусе", пока не будет очищено.
  Проверка совпадения введенных паролей осуществляется только при отправке формы.
  */

  // // Валидация при изменении
  // const handleChange = useCallback(
  //   (field: keyof RegistrationFormData, value: string) => {
  //     setFormData(prev => ({ ...prev, [field]: value }));

  //     // Сбрасываем ошибку при пустом поле
  //     if (value === "") {
  //       setErrors(prev => ({ ...prev, [field]: undefined }));
  //       setTouched(prev => ({ ...prev, [field]: false })); // Сбрасываем тронутость
  //       return;
  //     }
      
  //     // Валидируем только если поле было "тронуто" и значение не пустое
  //     if (touched[field]) {
  //       const error = validateField(registrationSchema, field, value);
  //       setErrors(prev => ({ ...prev, [field]: error }));
  //     }

  //   },
  //   [touched]
  // );

  // // Валидация при потере фокуса
  // const handleBlur = useCallback((field: keyof RegistrationFormData) => {
  //   // Помечаем как тронутое только если значение не пустое
  //   if (formData[field].trim() !== "") {
  //     setTouched(prev => ({ ...prev, [field]: true }));
  //     const error = validateField(registrationSchema, field, formData[field]);
  //     setErrors(prev => ({ ...prev, [field]: error }));
  //   }
  // }, [formData]);

  // // Валидация формы при отправке
  // const validateForm = () => {

  //   // Помечаем все поля как тронутые при отправке
  //   setTouched({
  //     email: true,
  //     password: true,
  //     confirmPassword: true
  //   });

  //   try {
  //     registrationSchema.parse(formData);
  //     setErrors({});
  //     return true;
  //   } 
  //   catch (error) 
  //   {
  //     if (error instanceof z.ZodError) {
  //       const newErrors: FormErrors<RegistrationFormData> = {};
  //       error.errors.forEach(err => {
  //         const path = err.path[0] as keyof RegistrationFormData;
  //         newErrors[path] = err.message;
  //       });
  //       setErrors(newErrors);
  //     }
  //     return false;
  //   }
  // };


  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors
  } = useZodForm<RegistrationFormData>({
    schema: registrationSchema,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (data) => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/v3/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
          }),
        });

        const result = await res.json();

        // Обработка ошибок с сервера
        if (!res.ok) {
          if (result.message === `Email ${formData.email} already in use`) {
            setErrors({ email: "Этот email уже зарегистрирован" });
          } else {
            setErrors({ general: result.error || "Ошибка регистрации" });
          }
          return;
        }

        router.push("/login");
      } 
      catch (error) 
      {
        setErrors({ general: "Сетевая ошибка" });
      } 
      finally 
      {
        setLoading(false);
      }
    },
  });




  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   console.log("Отправляемые данные:", {
  //     formData
  //   });

  //   // Отправка данных
  //   setLoading(true);
  //   try {
  //     const res = await fetch("http://localhost:8080/api/v3/register", {
  //       method: "POST",
  //       headers: { 
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //       },
  //       body: JSON.stringify({ 
  //         email: formData.email,
  //         password: formData.password,
  //         confirmPassword: formData.confirmPassword
  //       }),
  //     });

  //     const result = await res.json();

  //     // Обработка ошибок с сервера
  //     if (!res.ok) {
  //       if (result.message === `Email ${formData.email} already in use`) {
  //         setErrors({ email: "Этот email уже зарегистрирован" });
  //       } else {
  //         setErrors({ general: result.error || "Ошибка регистрации" });
  //       }
  //       return;
  //     }

  //     router.push("/login");
  //   } 
  //   catch (error) 
  //   {
  //     setErrors({ general: "Сетевая ошибка" });
  //   } 
  //   finally 
  //   {
  //     setLoading(false);
  //   }


  
  return (
    <>
      <GridDev/>
        
      <div className="w-4/5 max-w-screen-md mx-auto">
          
        <div className="grid grid-cols-12 gap-x-4 mt-52 border border-gray-500">
          <h1 className="col-span-6 col-start-4 text-3xl text-center font-semibold">Регистрация профиля</h1>

          <Form className="col-span-6 col-start-4 mt-6 grid grid-cols-6 gap-x-4" validationErrors={errors} onSubmit={handleSubmit}>

            {/* 
            Для соответствия дизайну использую стандартный тип variant="flat" при пустом поле и переключаю
            на тип bordered при непустом поле так:
            variant={formData.email === "" ? "flat" : "bordered"}

            Это оказалось самым валидным решением с минимумом дополнительных classNames стилей для управления и без багов.
            Однако, при переключении типа поля label над полем смещается вправо на толщину появляющейся границы, 
            что бросается в глаза, => необходим какой-либо костыль.
            Потому добавил прозрачную границу при пустом поле для flat чтоб искусственно добавить этот отступ.
            */}

            {/* Почта */}
            <div className="col-span-6">
              <Input 
                isClearable
                isRequired
                name="email"
                label="Почта"
                labelPlacement="outside"
                placeholder="Введите почту"
                type="email"
                radius="md"
                value={formData.email}

                onValueChange={(value) => handleChange("email", value)}
                onBlur={() => handleBlur("email")}
                isInvalid={!!(touched.email && errors.email)}
                errorMessage={touched.email ? errors.email : undefined}
                variant={formData.email === "" ? "flat" : "bordered"}
                classNames={{ inputWrapper: formData.email === "" ? "border-2 border-transparent" : errors.email ? "" : "border-green-400" }}
              />
            </div>
                
            {/* Пароль */}
            <div className="col-span-6 mt-4">
              <Input
                isRequired
                name="password"
                label="Пароль"
                labelPlacement="outside"
                placeholder="Введите пароль"
                type={isVisible ? "text" : "password"}
                value={formData.password}

                onValueChange={(value) => handleChange("password", value)}
                onBlur={() => handleBlur("password")}
                isInvalid={!!(touched.password && errors.password)}
                errorMessage={touched.password ? errors.password : undefined}
                variant={formData.password === "" ? "flat" : "bordered"}
                classNames={{ inputWrapper: formData.password === "" ? "border-2 border-transparent" : errors.password ? "" : "border-green-400" }}
                
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                    )}
                  </button>
                }
              />
            </div>

            {/* Подтверждение пароля */}
            <div className="col-span-6 mt-4">
              <Input
                isRequired
                name="confirmPassword"
                label="Повторите пароль"
                labelPlacement="outside"
                placeholder="Введите пароль"
                type={isVisible ? "text" : "password"}
                value={formData.confirmPassword}

                onValueChange={(value) => handleChange("confirmPassword", value)}
                onBlur={() => handleBlur("confirmPassword")}
                isInvalid={!!(touched.confirmPassword && errors.confirmPassword)}
                errorMessage={touched.confirmPassword ? errors.confirmPassword : undefined}
                variant={formData.confirmPassword === "" ? "flat" : "bordered"}
                classNames={{ inputWrapper: formData.confirmPassword === "" ? "border-2 border-transparent" : errors.confirmPassword ? "" : "border-green-400" }}
                
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                    )}
                  </button>
                }
              />
            </div>

            <div className="col-span-3 col-end-7 text-right border border-gray-500">
              <p className="text-sm text-blue-500">Забыли пароль?</p>
            </div>

            {errors.general && (<p className="col-span-3 text-red-500 text-sm">{errors.general}</p>)}
        
            <Button isLoading={loading} className="col-span-6 mt-3 bg-blue-600 text-white" type="submit">Зарегистрироваться</Button>
            <Button as={Link} href="/login" variant="bordered" className="col-span-6 bg-gray-100">Войти</Button>
          </Form>

        </div>
      </div>
    </>
  );
};


export const EyeSlashFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};
