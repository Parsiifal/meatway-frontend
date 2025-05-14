"use server";
import { cookies } from "next/headers";
import { AdvertisementUnion, BeefAdvertisementType, BirdAdvertisementType,
  PorkAdvertisementType, SheepmeatAdvertisementType, SpecialmeatAdvertisementType
} from "../model/advertisementTypes";
import { FilePath } from "tailwindcss/types/config";
import { UserDataType } from "@/page/account/model/types";

type ApiResponse = {
  id?: string;
  title: string;
  description: string;
  price: number;
  hasMedicalCertificate: true;
  weight: number;
  location: string;
  isFrozen: boolean;
  isRetail: boolean;
  breed?: string;
  monthsAge?: number;
  files?: FilePath[];
  sellerUser: UserDataType;
  meatType: "beef" | "bird" | "pork" | "sheepmeat" | "specialmeat";
  isHalal?: boolean;
  isMramor?: boolean;
  feedingType?: string;
  cuttingType?: string;
  birdType?: string;
  fatContent?: string;
  processingType?: string;
  animalType?: string;
};

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

    // Получаем токен
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Токен авторизации не найден");
      
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
    return { data: normalizeData(advertisements.ads, meatType) };
  } 
  catch (error) {
    return { error: "Не удалось загрузить объявления. Попробуйте позже." };
  }
};


const normalizeData = (data: ApiResponse[], meatType: string): AdvertisementUnion[] => {

  const normalizers: Record<string, (item: ApiResponse) => AdvertisementUnion> = {
    beef: (item) => ({
      ...item,
      meatType: "beef",
      isHalal: item.isHalal ?? false,
      isMramor: item.isMramor ?? false,
      feedingType: item.feedingType || "Не указано",
      cuttingType: item.cuttingType || "Не указано",
    } as BeefAdvertisementType),
    
    bird: (item) => ({
      ...item,
      meatType: "bird",
      birdType: item.birdType || "Не указано",
    } as BirdAdvertisementType),

    pork: (item) => ({
      ...item,
      meatType: "pork",
      fatContent: item.fatContent || "Не указано",
      processingType: item.processingType || "Не указано",
    } as PorkAdvertisementType),
    
    sheepmeat: (item) => ({
      ...item,
      meatType: "sheepmeat",
      isHalal: item.isHalal ?? false,
      feedingType: item.feedingType || "Не указано",
      cuttingType: item.cuttingType || "Не указано",
    } as SheepmeatAdvertisementType),
    
    specialmeat: (item) => ({
      ...item,
      meatType: "specialmeat",
      isHalal: item.isHalal ?? false,
      animalType: item.animalType || "Не указано",
      feedingType: item.feedingType || "Не указано",
    } as SpecialmeatAdvertisementType)
  };

  return data.map(normalizers[meatType] ?? ((item) => item as AdvertisementUnion));
};