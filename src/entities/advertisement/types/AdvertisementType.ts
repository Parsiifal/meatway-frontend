export type AdvertisementType = {
  id: string;
  title: string;
  description: string;
  price: number;
  breed: string;
  monthsAge: number;
  weight: number;
  quantity: number;
  location: string;
  isFrozen: boolean;
  isRetail: boolean;
  dateBegin?: Date;
  dateEnd?: Date;
  killDate?: Date;
  hasMedicalCertificate: true;
  isActive: true;
  creationDate?: Date;
}

export type BeefAdvertisementType = AdvertisementType & {
  meatType: "beef";
  isHalal: boolean;
  isMramor: boolean;
}

export type BirdAdvertisementType = AdvertisementType & {
  meatType: "bird";
  isHalal: boolean;
  birdType: string;
}

export type PorkAdvertisementType = AdvertisementType & {
  meatType: "pork";
}

export type SheepmeatAdvertisementType = AdvertisementType & {
  meatType: "sheepmeat";
  isHalal: boolean;
}

export type SpecialmeatAdvertisementType = AdvertisementType & {
  meatType: "specialmeat";
  isHalal: boolean;
}

export type AdvertisementUnion = BeefAdvertisementType | BirdAdvertisementType 
| PorkAdvertisementType | SheepmeatAdvertisementType | SpecialmeatAdvertisementType;