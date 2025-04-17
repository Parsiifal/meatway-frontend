import { AdvertisementType } from "./AdvertisementType";

export interface SpecilmeatAdvertisementType extends AdvertisementType {
  meatType: "specialmeat";
  isHalal: boolean;
}
