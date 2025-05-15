import { UserDataType } from "@/page/account/model/types";

type FilePath = {
  path: string
}

export type AdvertisementType = {
  id?: string;
  meatType: "beef" | "bird" | "pork" | "sheepmeat" | "specialmeat"; // Системное поле для API запросов на сервер
  title: string;
  description: string;
  price: number;
  hasMedicalCertificate: true;
  weight: number;
  location: string;
  isFrozen: boolean;
  isRetail: boolean;
  quantity: number;
  sellerUser: UserDataType;
  breed?: string;
  monthsAge?: number;
  files?: FilePath[];
}

export type BeefAdvertisementType = AdvertisementType & {
  isHalal: boolean;
  isMramor: boolean;
  feedingType?: string;
  cuttingType?: string;
}

export type BirdAdvertisementType = AdvertisementType & {
  birdType: string;
}

export type PorkAdvertisementType = AdvertisementType & {
  fatContent?: string;
  processingType?: string;
}

export type SheepmeatAdvertisementType = AdvertisementType & {
  isHalal: boolean;
  feedingType?: string;
  cuttingType?: string;
}

export type SpecialmeatAdvertisementType = AdvertisementType & {
  isHalal: boolean;
  animalType: string;
  feedingType?: string;
}

export type AdvertisementUnion = BeefAdvertisementType | BirdAdvertisementType 
| PorkAdvertisementType | SheepmeatAdvertisementType | SpecialmeatAdvertisementType;