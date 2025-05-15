"use server";
import { AdvertisementUnion } from "../model/advertisementTypes";
import { getUserToken } from "@/shared/api/getUserToken";


type AdvertisementResponse = {
  data?: AdvertisementUnion[];
  error?: string;
};

export const getAdvertisements = async (meatType: string): Promise<AdvertisementResponse> => {
  try {
    const endpointMap: Record<string, string> = {
      all: "/api/v1/ads",
      beef: "/api/v1/ads/beefs",
      bird: "/api/v1/ads/birds",
      pork: "/api/v1/ads/porks",
      sheepmeat: "/api/v1/ads/sheepmeats",
      specialmeat: "/api/v1/ads/specialmeats",
    };
    const endpoint: string = endpointMap[meatType] || endpointMap.all;

    const token = await getUserToken();
      
    const response = await fetch(`${process.env.SERVER_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) return { error: "Нет ответа от сервера!" };
      
    const advertisements = await response.json();
    if (advertisements.size == 0) return { error: "Нет объявлений данного типа!" };
    return { data: advertisements.ads };
  } 
  catch (error) {
    return { error: "Не удалось загрузить объявления. Попробуйте позже." };
  }
};