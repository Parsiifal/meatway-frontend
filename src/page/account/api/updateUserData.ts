"use server";
import { UserDataType, UpdateUserDataType } from "../model/types";
import { cookies } from "next/headers";

export const updateUserData = async (updateUserData: UpdateUserDataType): Promise<UserDataType> => {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) throw new Error("Токен авторизации не найден");

  const response = await fetch(`${process.env.SERVER_URL}/api/v1/users`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(updateUserData)
  });

  if (!response.ok) {
    throw new Error("Ошибка обновления данных!");
  }

  return await response.json();
};