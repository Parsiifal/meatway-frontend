import { UserDataType } from "@/page/account/model/types";

type FilePath = {
  path: string
}

export type AdvertisementType = {
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
}

export type BeefAdvertisementType = AdvertisementType & {
  meatType: "beef";
  isHalal: boolean;
  isMramor: boolean;
  feedingType?: string;
  cuttingType?: string;
}

export type BirdAdvertisementType = AdvertisementType & {
  meatType: "bird";
  birdType: string;
}

export type PorkAdvertisementType = AdvertisementType & {
  meatType: "pork";
  fatContent?: string;
  processingType?: string;
}

export type SheepmeatAdvertisementType = AdvertisementType & {
  meatType: "sheepmeat";
  isHalal: boolean;
  feedingType?: string;
  cuttingType?: string;
}

export type SpecialmeatAdvertisementType = AdvertisementType & {
  meatType: "specialmeat";
  isHalal: boolean;
  animalType: string;
  feedingType?: string;
}

export type AdvertisementUnion = BeefAdvertisementType | BirdAdvertisementType 
| PorkAdvertisementType | SheepmeatAdvertisementType | SpecialmeatAdvertisementType;