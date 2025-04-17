import { AdvertisementType } from "./AdvertisementType";

export interface BeefAdvertisementType extends AdvertisementType {
  meatType: "beef";
  isHalal: boolean;
  isMramor: string;
}
