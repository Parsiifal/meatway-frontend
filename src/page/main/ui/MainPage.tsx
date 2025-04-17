"use client";
import { GridDev } from "./Grid/GridDev";
import "./MainPage.css";
import { TopContent } from "./TopContent/TopContent";
import { ButtonsMeatType } from "./ButtonsMeatType/ButtonsMeatType";
import { Filters } from "./Filters/Filters";
import { Advertisement } from "./Advertisements/Advertisement";
import { AdvertisementUnion } from "@/entities/advertisement/types/AdvertisementType";
import { AdvertisementApi } from "@/entities/advertisement/api/AdvertisementApi";
import { useState, useEffect } from "react";

interface MainPageProps {
  initialAds: AdvertisementUnion[];
  initialError?: string;
}

export const MainPage = ({ initialAds, initialError }: MainPageProps) => {

  const [selectedType, setSelectedType] = useState<string>("all"); // выбор типа мяса пользователем
  const [ads, setAds] = useState<AdvertisementUnion[]>(initialAds); // установка набора объявлений сервером

  const [error, setError] = useState<string | null>(initialError || null);
  const [loading, setLoading] = useState(false);

  const fetchAds = async (type: string) => {
    try {
      setLoading(true);
      const { data, error } = await AdvertisementApi.getAll(type);
      
      if (error) throw new Error(error);
      if (data) setAds(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
      setAds([]);
    } finally {
      setLoading(false);
      console.log(selectedType);
    }
  };

  useEffect(() => {
    if (selectedType !== "all") {
      fetchAds(selectedType);
    } else {
      setAds(initialAds);
      setError(initialError || null);
    }
  }, [selectedType]);

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