import { AdvertisementType } from "./AdvertisementType";

export interface SheepmeatAdvertisementType extends AdvertisementType {
  meatType: "sheepmeat";
  isHalal: boolean;
}
