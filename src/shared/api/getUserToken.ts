"use server";
import { cookies } from "next/headers";

export const getUserToken = async (): Promise<string> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Отсутствует токен!");
    return token;
  }
  catch (error) {
    throw error;
  }
};