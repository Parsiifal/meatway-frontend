"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, addToast } from "@heroui/react";
import { useAuthValidators } from "../hooks/useAuthValidators";
import { loginSchema, LoginFormData } from "../model/authValidationSchemes";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/shared/ui";
import Link from "next/link";
//import { GridDev } from "./GridDev";


export const LoginPage = () => {
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    formData,
    errors,
    touched,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit    
  } = useAuthValidators<LoginFormData>({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {

      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v3/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });
  
        const result = await response.json();
  
        // Обработка ошибок с сервера
        if (!response.ok) {
          if (response.status === 401) {
            setErrors({ password: "Неверный пароль" });
          } else {
            setErrors({ general: result.error || "Ошибка входа" });
          }
          return;
        }
        else {
          // Получаем токен из ответа сервера
          const { token } = result;
          console.log("Токен получен");
          // Сохраняем токен в localStorage
          localStorage.setItem("authToken", token);
          router.push("/main");
        }
  
      } 
      catch (error) {
        setErrors({ general: "Сетевая ошибка" });
      } 
      finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* <GridDev/> */}
    
      <div className="w-4/5 max-w-screen-md mx-auto">
          
        <div className="grid grid-cols-12 gap-x-4 mt-[20vh]">

          <div className="col-span-2 col-start-4 text-left">
            <Link href="/main" className="text-sm hover:text-blue-500">На главную</Link>
          </div>

          <h1 className="col-span-6 col-start-4 mt-5 text-3xl text-center font-semibold">Вход в профиль</h1>

          <Form className="col-span-6 col-start-4 mt-6 grid grid-cols-6 gap-x-4" validationErrors={errors} onSubmit={handleSubmit}>

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

            <div className="col-span-3 col-end-7 text-right">
              <Link href="#" className="text-sm text-blue-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  addToast({
                    title: "Мои соболезнования",
                    timeout: 1500,
                    color: "primary",
                    variant: "solid",
                    classNames: {
                      base: "mt-[8vh]",
                      title: "text-md",
                    }
                  });
                }}>
                Забыли пароль?
              </Link>
            </div>

            {errors.general && (<p className="col-span-3 text-red-500 text-sm">{errors.general}</p>)}
        
            <Button isLoading={loading} className="col-span-6 mt-3 bg-blue-600 text-white" type="submit">Войти</Button>
            <Button as={Link} href="/auth/registration" variant="bordered" className="col-span-6 bg-gray-100">Зарегистрироваться</Button>
          </Form>

        </div>
      </div>
    </>
  );
};
