import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import "../MainPage.css";
import { Avatar } from "@heroui/react";
import { AdvertisementUnion } from "@/page/main/model/advertisementTypes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CustomSpinner } from "@/shared/ui/components/CustomSpinner";

interface AdvertisementProps {
  advertisements: AdvertisementUnion[];
  error?: string;
}

export const Advertisement = ({ advertisements, error }: AdvertisementProps) => {

  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Настройки карусели изображений
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Получаем из minio аватарки владельцев объявлений
  useEffect(() => {
    advertisements.forEach((ad) => {
      if (!ad.id || avatars[ad.id]) return;
      const avatar = ad.sellerUser?.photo?.path ?? "Default avatar.jpg";
      
      fetch(`/api/download?filename=${avatar}`)
        .then((res) => 
          res.ok ? res.json() : new Error("File not found")
        )
        .then((avatarData) => {
          setAvatars((prev) => ({
            ...prev,
            [ad.id!]: avatarData.data.url,
          }));
        })
        .catch(() => {
          setAvatars((prev) => ({
            ...prev,
            [ad.id!]: "Default avatar.jpg",
          }));
        });
    });
    setIsLoading(false);
  }, [advertisements, avatars]);

  if (isLoading) {
    return (
      <><CustomSpinner mt={5}/></>
    );
  }

  if (error) {
    if(error === "Нет объявлений данного типа!") {
      return (
        <p className="mt-4 text-2xl text-center text-gray-500">Пока нет ни одного объявления!</p>
      );
    }
    return (
      <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">Ошибка загрузки объявлений!</p>
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  } 

  //console.log(avatars);
  //console.log(advertisements);

  // Нужно потом переделать нормально через запросы к minio через API роуты
  const defaultUrlPath = "http://localhost:9000/meatway-bucket/";

  return (
    <>
      {advertisements.map((ad) => (
        <div key={ad.id} className="mt-4 bg-white rounded-2xl border border-cyan-500">
          
          <div className="gridLg">
            
            {/* Изображения объявления */}
            <div className="col-span-4 col-start-1 pl-1 pt-4 border border-purple-500">
              {ad.files?.length != undefined && ad.files?.length > 1 ? (
              // Слайдер для нескольких изображений
                <div className="pb-8">
                  <Slider {...settings}>
                    {ad.files?.map((file, index) => (
                      <div key={`${ad.id}-${index}`} className="pr-1">
                        <div className="h-48 w-full border-2 border-gray-500 rounded-xl overflow-hidden aspect-square relative">
                          <Image
                            src={defaultUrlPath + file.path}
                            alt={`Изображение ${index + 1} - ${ad.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                            quality={85}
                            style={{
                              borderRadius: "0.5rem"
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : ad.files?.length === 1 ? (
              // Одиночное изображение без слайдера
                <div className="pr-1 pb-4">
                  <div className="h-48 w-full border-2 border-gray-500 rounded-xl overflow-hidden aspect-square relative">
                    <Image
                      src={defaultUrlPath + ad.files[0].path}
                      alt={`Единственное изображение - ${ad.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center"
                      quality={85}
                      style={{
                        borderRadius: "0.5rem"
                      }}
                    />
                  </div>
                </div>
              ) : (
              // Дефолтная картинка если нет изображений
                <div className="pr-1 pb-4">
                  <div className="h-48 w-full border-2 border-gray-500 rounded-xl overflow-hidden aspect-square relative">
                    <Image
                      src={defaultUrlPath + "default-adv-image.jpg"}
                      alt="Изображение отсутствует"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center"
                      quality={85}
                      style={{
                        borderRadius: "0.5rem"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>


            {/* Информация объявления */}
            <div className="col-span-5 col-start-5 mt-4 mb-4 border border-gray-500">
              <Link href={`/advertisement/${ad.id}?meatType=${ad.meatType}`}
                className="text-xl border border-gray-500">
                {ad.title}
              </Link>
              <p className="mt-1 border border-gray-500">{ad.weight || "Не указано"} кг</p>
              <p className="mt-1">Количество: {ad.quantity + " шт"}</p>
              <p className="mt-1 text-sm border border-gray-500">{ad.location}</p>
              <p className="mt-1 text-sm border border-gray-500">Возраст: {ad.monthsAge ? ad.monthsAge + " (месяцев)" : "не указано"}</p> {/* Возраст */}
              <p className="mt-[18px] w-[120px] text-xl text-center bg-green-400 p-1 rounded-lg">{ad.price} р/кг</p>
            </div>


            {/* Владелец объявления и доп. информация */}
            <div className="col-start-10 col-end-13 grid grid-cols-subgrid gap-x-4 content-start mt-4 border border-gray-500">
              <div className="col-span-3 flex flex-row items-center gap-x-3 p-1">            
                {/* По какой то причине некоторые картинки могут отображатся в аватарах с плохим качеством.
                  Я потратил много времени, чтоб понять почему так, но результатов это не дало. И дело не в либе,
                  с другими либами также. Есть 2 предположения почему так может происходить:
                  1. Изменение/ограничение размеров компонента или картинки не стандартными либовскими средствами, что ломает рендер.
                  2. Сами изображения шакальные и некорректно рендерятся. */}
                <Avatar isBordered size="lg" src={avatars[ad.id!]}/>
                <p className="text-md whitespace-nowrap">{`${ad.sellerUser?.name || "Безымянный"} ${ad.sellerUser?.surname || ""}`}</p>
              </div>

              <div className="col-span-2 text-center mt-5 border border-red-500">
                {/* Халяль */}
                {"isHalal" in ad ? ad.isHalal ? (<p className="bg-green-400 p-1 rounded-xl">Халяль</p>) : 
                  (<p className="bg-red-400 text-white p-1 rounded-xl">Халяль</p>) : <></>
                }

                {/* Мраморность */}
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