"use client";
import { GridDev } from "./Grid/GridDev";
import "./MainPage.css";
import { TopContent } from "./TopContent/TopContent";
import { ButtonsMeatType } from "./ButtonsMeatType/ButtonsMeatType";
import { Filters } from "./Filters/Filters";
import { Advertisement } from "./Advertisements/Advertisement";
import { AdvertisementUnion } from "@/page/main/model/advertisementTypes";
import { useState, useEffect } from "react";
import { getAdvertisements } from "../api/getAdvertisements";


export const MainPage = () => {

  const [selectedType, setSelectedType] = useState<string>("all");
  const [ads, setAds] = useState<AdvertisementUnion[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Загрузить объявления конкретного типа (в том числе всех)
  const fetchAds = async (type: string) => {
    try {
      setError(null); // Сбрасываем ошибки перед каждым новым запросом
      const { data, error } = await getAdvertisements(type);

      if (error) throw new Error(error);
      if (data) setAds(data);
    } 
    catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Ошибка загрузки объявлений!");
      setAds([]);
    } 
    finally {
      console.log(selectedType);
    }
  };
  useEffect(() => {fetchAds(selectedType);}, [selectedType]);

  return (
    <div>
      <GridDev/>

      <div className="w-4/5 max-w-screen-lg mx-auto">
        {/* Верхняя надпись и местоположение */}
        <TopContent/>
        {/* Кнопки выбора мяса */}
        <ButtonsMeatType onSelect={setSelectedType}/>
        {/* Фильтры */}
        <Filters/>
      </div>
      
      <div className="mt-6 bg-gray-200 min-h-[70vh] border border-orange-500">
        <div className="w-4/5 max-w-screen-lg mx-auto">
          {/* Объявления */}
          <Advertisement advertisements={ads} error={error || undefined}/>
        </div>
      </div>

    </div>
  );
};