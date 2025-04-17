import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import "../MainPage.css";

import { Avatar } from "@heroui/react";
import { AdvertisementUnion } from "@/entities/advertisement/types/AdvertisementType";


import { CircularProgress } from "@heroui/react";

interface AdvertisementProps {
  advertisements: AdvertisementUnion[];
  error?: string;
}

export const Advertisement = ({ advertisements, error }: AdvertisementProps) => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">Ошибка загрузки объявлений</p>
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  };

  if (!Array.isArray(advertisements)) {
    console.error("Ожидаю массив advertisements, получил:", advertisements);
  }
  

  // 2) Пока нет данных (undefined) — крутилка
  if (advertisements === undefined) { 
    return (
      <div className="flex justify-center mt-10">
        <CircularProgress label="Загрузка..."/>
      </div>
    );
  }

  // Если нет объявлений
  if (advertisements.length === 0) {
    return (
      <p className="mt-4 text-center text-gray-500">
        Пока нет ни одного объявления.
      </p>
    );
  }

  const staticImages = [
    "/1/1.jpg",
    "/1/2.jpg",
    "/1/3.jpg",
  ];

  console.log(advertisements[0]);

  return (
    <>
      {advertisements.map((ad) => (
        <div key={ad.id} className="mt-4 bg-white rounded-2xl border border-cyan-500">
          
          <div className="gridLg">
            
            <div className="col-span-4 col-start-1 pl-1 pt-4 pb-8 border border-purple-500">
              <Slider {...settings}>
                {staticImages.map((img: string, index: number) => (
                  <div key={index} className="pr-1"> {/* Отступ между слайдами */}
                    <div className="relative h-48 w-full bg-gray-800 border rounded-2xl border-gray-500"> {/* Фиксированная высота контейнера */}
                      <Image
                        src={img} 
                        alt={`Slide ${index + 1}`}
                        width={400}
                        height={200}
                        className="object-contain"
                        style={{ width: "100%", height: "auto", maxHeight: "100%" }}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="col-span-4 col-start-5 mt-4 border border-gray-500">
              <p className="text-xl border border-gray-500">{ad.title}</p>
              <p className="mt-1 border border-gray-500">{ad.breed}</p> {/* Порода */}
              <p className="mt-1 border border-gray-500">{ad.monthsAge} месяцев</p>
              <p className="mt-1 border border-gray-500">{ad.weight} кг</p>
              <p className="mt-1 text-sm border border-gray-500">{ad.location}</p>
              <p className="mt-3 w-[120px] text-xl text-center bg-green-400 p-1 rounded-lg">{ad.price} р/кг</p>
            </div>

            <div className="col-start-10 col-end-13 grid grid-cols-subgrid gap-x-4 content-start mt-2 border border-gray-500">
              <div className="col-span-3 flex flex-row items-center gap-x-3 p-1">
                <Avatar 
                  isBordered 
                  size="lg" 
                  src={"/1/user.jpg"}
                  className="flex-shrink-0" // Фиксируем размер
                />
                <p className="text-md whitespace-nowrap">Артем Инкин</p>
              </div>

              <div className="col-span-2 text-center mt-5 border border-red-500">
                {/* Отображение халяль с цветовой индикацией кроме свинины*/}
                {"isHalal" in ad ? ad.isHalal ? (<p className="bg-green-400 p-1 rounded-xl">Халяль</p>) : 
                  (<p className="bg-red-400 text-white p-1 rounded-xl">Халяль</p>) : <></>
                }

                {/* Мраморность для говядины */}
                {"isMramor" in ad ? ad.isMramor ? (<p className="bg-green-400 p-1 rounded-xl mt-1">Мраморное</p>) :
                  (<p className="bg-red-400 text-white p-1 rounded-xl mt-1">Мраморное</p>) : <></>
                }
              
                {/* Замороженое или свежее*/}
                {ad.isFrozen ? (<p className="bg-blue-400 text-white p-1 rounded-xl mt-1">Замороженое</p>) : 
                  (<p className="bg-green-400 p-1 rounded-xl mt-1">Свежее</p>)
                }
              </div>
            </div>

          </div>
        </div>
      ))}
    </>
  );
};