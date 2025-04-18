// app/register/page.tsx
"use client";
import { GridDev } from "./GridDev";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Form, Input, Button } from "@heroui/react";
import Link from "next/link";

const signUpSchema = z.object({
  email: z.string().email("Неверный e‑mail"),
  password: z.string().min(5, "Минимум 5 символов").max(25, "Максимум 25 символов!"),
});

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export const LoginPage = () => {
  
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Клиент‑валидация через zod
    // Клиентская валидация
    try {
      signUpSchema.parse(data);
    } catch (zErr) {
      const errorMap = (zErr as z.ZodError).issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(errorMap);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/v3/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        // Обработка ошибок с сервера
        if (result.error === "Email already exists") {
          setErrors({ email: "Этот email уже зарегистрирован" });
        } else {
          setErrors({ general: result.error || "Ошибка регистрации" });
        }
        return;
      }

      // Получаем токен из ответа сервера
      const { token } = result;

      console.log(token);
      // Сохраняем токен (3 варианта на выбор):

      // 1. В localStorage (просто, но не SSR-дружественно)
      localStorage.setItem("authToken", token);

      router.push("/about");
    } 
    catch (error) 
    {
      setErrors({ general: "Сетевая ошибка" });
    } 
    finally 
    {
      setLoading(false);
    }

  };

  return (
    <>
      <GridDev/>
    
      <div className="w-4/5 max-w-screen-md mx-auto">
          
        <div className="grid grid-cols-12 gap-x-4 mt-52 border border-gray-500">
          <h1 className="col-span-6 col-start-4 text-3xl text-center font-semibold">Вход в профиль</h1>

          <Form className="col-span-6 col-start-4 mt-6 grid grid-cols-6 gap-x-4" validationErrors={errors} onSubmit={handleSubmit}>

            <div className="col-span-6">
              <Input
                isRequired
                name="email"
                label="Почта"
                labelPlacement="outside"
                placeholder="Введите почту"
                type="email"
                validate={(value) => {
                  if (value.length === 0) {
                    return "Обязательное поле!";
                  }

                  return value === "admin" ? "Nice try!" : null;
                }}
                errorMessage={({ validationDetails, validationErrors }) => {
                  if (validationDetails.typeMismatch) {
                    return "Введите корректный адрес!";
                  }
    
                  return validationErrors;
                }}
              />
            </div>
        
            <div className="col-span-6 mt-4">
              <Input
                isRequired
                name="password"
                label="Пароль"
                labelPlacement="outside"
                placeholder="Введите пароль"
                type="password"
                validate={(value) => {
                  if (value.length === 0) {
                    return "Обязательное поле!";
                  }
                  if (value.length < 5) {
                    return "Пароль должен быть не короче 5 символов!";
                  }
                  if (value.length > 25) {
                    return "Пароль должен быть не длиннее 25 символов!";
                  }

                  return value === "admin" ? "Nice try!" : null;
                }}
              />
            </div>

            <div className="col-span-3 col-end-7 text-right border border-gray-500">
              <p className="text-sm text-blue-500">Забыли пароль?</p>
            </div>

            {errors.general && (
              <p className="col-span-3 text-red-500 text-sm">{errors.general}</p>
            )}
        
            <Button className="col-span-6 mt-3 bg-blue-600 text-white" type="submit">Войти</Button>
            <Button as={Link} href="/register" variant="bordered" className="col-span-6 bg-gray-100">Зарегистрироваться</Button>
          </Form>

        </div>
      </div>
    </>
  );
};

