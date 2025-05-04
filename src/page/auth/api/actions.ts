"use server";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginFormData } from "@/page/auth/model/authValidationSchemes";


export async function isLoggedIn() {
  const cookieStore = await cookies();
  return cookieStore.has("token");
}


export async function login(email: string, password: string ): Promise<Partial<LoginFormData & { general: string }> | null> {
  try {
    // Делаем запрос
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const result = await response.json();

    // Обработка ошибок с сервера
    if (!response.ok) {
      if (response.status === 401) {
        return { password: "Неверный пароль" };
      } 
      else {
        return { general: result.error || "Ошибка входа" };
      }
    }
    else {
      // Получаем токен из ответа сервера
      const token = result.accessToken;

      if (!token) {
        return { general: "Токен отсутствует в ответе сервера" };
      }

      // Расшифровываем для установки протухания
      const payload = decodeJwt(token);
      if (typeof payload.exp !== "number") {
        return { general: "Недействительный токен: отсутствует срок действия" };
      }

      const expiresAt = new Date(payload.exp * 1000);

      // Сохраняем токен в куки
      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
      });

      return null;
    }
  }
  catch (error) {
    return { general: "Сетевая ошибка" };
  }
}


export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/");
}