import { useState } from "react";
import { PriceMinFilter } from "./AllFilters/PriceMinFilter";
import { PriceMaxFilter } from "./AllFilters/PriceMaxFilter";
import { WeightMinFilter } from "./AllFilters/WeightMinFilter";
import { WeightMaxFilter } from "./AllFilters/WeightMaxFilter";

// Фильтры
export const Filters = () => {

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const [minWeight, setMinWeight] = useState<number | undefined>(undefined);
  const [maxWeight, setMaxWeight] = useState<number | undefined>(undefined);

  return (
    <div className="gridLg mt-6">
      <p className="col-span-2 mb-2 text-md">Цена за кг</p>
      <p className="col-span-2 col-start-5 mb-2 text-md">Вес туши</p>

      {/* Цена от */}
      <PriceMinFilter value={minPrice} onChange={setMinPrice} maxValue={maxPrice}/>
      {/* Цена до */}
      <PriceMaxFilter value={maxPrice} onChange={setMaxPrice} minValue={minPrice}/>

      {/* Вес от */}
      <WeightMinFilter value={minWeight} onChange={setMinWeight} maxValue={maxWeight}/>
      {/* Вес до */}
      <WeightMaxFilter value={maxWeight} onChange={setMaxWeight} minValue={minWeight}/>

    </div>
  );
};