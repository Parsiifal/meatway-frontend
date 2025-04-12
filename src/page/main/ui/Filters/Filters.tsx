import { useState } from "react";
import { PriceMinFilter } from "./AllFilters/PriceMinFilter";
import { PriceMaxFilter } from "./AllFilters/PriceMaxFilter";

// Фильтры
export const Filters = () => {

  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);

  return (
    <div className="gridLg mt-6 border border-yellow-400">
      <p className="col-span-2 mb-2 text-md">Цена за кг</p>

      {/* Цена от */}
      <PriceMinFilter value={min}
        onChange={setMin}
        maxValue={max}/>
      {/* Цена до */}
      <PriceMaxFilter value={max}
        onChange={setMax}
        minValue={min}/>

      <p className="col-span-2 mb-2 text-md">Вес туши</p>

    </div>
  );
};