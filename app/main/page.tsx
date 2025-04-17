import { MainPage } from "@/page/main";
import { AdvertisementApi } from "@/entities/advertisement/api/AdvertisementApi";

export default async function MainRoute() {
  
  const { data: advertisements, error } = await AdvertisementApi.getAll();
  return <MainPage initialAds={advertisements || []} initialError={error}/>;
  
  
}
