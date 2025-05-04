"use server";
import { UserDataType } from "../model/userDataType";
import { cookies } from "next/headers";

export const getUserData = async (): Promise<UserDataType> => {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) throw new Error("Токен авторизации не найден");

  const response = await fetch(`${process.env.SERVER_URL}/api/v1/users/myprofile`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка получения данных пользователя!");
  }

  return await response.json();
};