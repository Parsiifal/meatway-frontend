"use server";
import { AdvertisementUnion } from "@/page/main/model/advertisementTypes";
import { getUserToken } from "@/shared/api/getUserToken";


export const getAdvertisementById = async (meatType: string, adId: string): Promise<AdvertisementUnion> => {
  try {
    if (meatType == "undefined" || !adId) throw new Error("Невалидные параметры запроса!");
    const token = await getUserToken();

    const response = await fetch(`${process.env.SERVER_URL}/api/v1/ads/${meatType + "s"}/${adId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) throw new Error("Нет ответа от сервера!");

    const adv = await response.json();
    if (adv === undefined) throw new Error("Сервер прислал пустые данные!");
    return adv;
  }
  catch (error) {
    throw error;
  }
};