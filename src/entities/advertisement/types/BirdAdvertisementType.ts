import { AdvertisementType } from "./AdvertisementType";

export interface BirdAdvertisementType extends AdvertisementType {
  meatType: "bird";
  isHalal: boolean;
  birdType: string;
}
