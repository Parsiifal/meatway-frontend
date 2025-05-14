"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, addToast } from "@heroui/react";
import { useAuthValidators } from "../hooks/useAuthValidators";
import { registrationSchema, RegistrationFormData } from "../model/authValidationSchemes";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/shared/ui";
import Link from "next/link";
//import { GridDev } from "./GridDev";


export const RegistrationPage = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  /* 
  Если ввод с пустого поля, то валидация применяется только при потере фокуса. 
  А если изменение уже введенных данных, ошибочных или корректных, то применяется валидация при изменении,
  так как поле сохраняет статус "в фокусе", пока не будет очищено.
  Проверка совпадения введенных паролей осуществляется только при отправке формы.
  */

  const {
    formData,
    errors,
    touched,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useAuthValidators<RegistrationFormData>({
    schema: registrationSchema,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (data) => {

      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
          }),
        });

        const result = await response.json();

        // Обработка ошибок с сервера
        if (!response.ok) {
          if (result.message === `Email ${formData.email} already in use`) {
            setErrors({ email: "Этот email уже зарегистрирован" });
          } else {
            setErrors({ general: result.error || "Ошибка регистрации" });
          }
          return;
        }
        else {
          addToast({
            title: "Профиль зарегистрирован",
            description: "Пожалуйста, выполните вход",
            color: "primary",
            variant: "solid",
            timeout: 3500,
            classNames: {
              base: "mt-[6vh]",
              title: "text-md",
            }
          });
          router.push("/auth/login");
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
          
        <div className="grid grid-cols-12 gap-x-4 mt-[17vh]">

          <div className="col-span-2 col-start-4 text-left">
            <Link href="/" className="text-sm hover:text-blue-500">Отменить</Link>
          </div>

          <h1 className="col-span-6 col-start-4 mt-5 text-3xl text-center font-semibold">Регистрация профиля</h1>

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

            {errors.general && (<p className="col-span-3 text-red-500 text-sm">{errors.general}</p>)}
        
            <Button isLoading={loading} className="col-span-6 mt-7 bg-blue-600 text-white" type="submit">Зарегистрироваться</Button>
            <Button as={Link} href="/auth/login" variant="bordered" className="col-span-6 bg-gray-100">Войти</Button>
          </Form>

        </div>
      </div>
    </>
  );
};
