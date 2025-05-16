"use server";
import { AdvertisementUnion } from "@/page/main/model/advertisementTypes";
import { getUserToken } from "@/shared/api/getUserToken";
import { handleApiResponse } from "@/shared/api/handleApiResponse";

export const createAd = async (adJson: string, meatType: string): Promise<boolean> => {
  try {
    const token = await getUserToken();
    const ad = JSON.parse(adJson) as AdvertisementUnion;

    const response = await fetch(`http://localhost:8080/api/v1/ads/${meatType}s`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(ad)
    });

    const res = await handleApiResponse<AdvertisementUnion>(response);
    if (res) return true;
    return false;
  }
  catch (error) {
    throw error;
  }
};