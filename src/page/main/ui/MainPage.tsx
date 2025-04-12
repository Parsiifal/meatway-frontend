"use client";
import { GridDev } from "./Grid/GridDev";
import "./MainPage.css";


import { TopContent } from "./TopContent/TopContent";
import { ButtonsMeatType } from "./ButtonsMeatType/ButtonsMeatType";
import { Filters } from "./Filters/Filters";

export const MainPage = () => {

  return (
    <div>
      <GridDev/>

      <div className="w-4/5 max-w-screen-lg mx-auto">
        {/* Верхняя надпись и местоположение */}
        <TopContent/>
        {/* Кнопки выбора мяса */}
        <ButtonsMeatType/>
        {/* Фильтры */}
        <Filters/>
          
      </div>
    </div>
  );
};