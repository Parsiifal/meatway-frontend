import { LocationIcon } from "@/shared/ui";
import "../MainPage.css";

export const TopContent = () => {
  return (
    <div className="gridLg">
      {/* Верхняя надпись */}
      <div className="col-span-8 mt-8">
        <h1 className="text-3xl font-bold">Хорошее мясо продается здесь</h1>
      </div>
    
      {/* Местоположение */}
      <div className="col-span-6 flex flex-row items-center gap-x-1 mt-2">
        <LocationIcon size={20}/>
        <p className="text-sm font-semibold">Самарская область, Большеглушицкий р-н</p>
      </div>
    </div>
  );
};