"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AdvertisementUnion } from "@/page/main/model/advertisementTypes";
import { useEffect, useState } from "react";
import { getAdvertisementById } from "../api/getAdvertisementById";
import { CustomSpinner } from "@/shared/ui/components/CustomSpinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Avatar } from "@heroui/react";
import { ReturnButton } from "@/shared/ui/components/ReturnButton";
//import { DevGridLg } from "@/shared/dev/DevGridLg";


export const Advertisement = () => {
  
  const router = useRouter();
  const search = useSearchParams();
  const params = useParams();
  const meatType = search.get("meatType");
  const adId = params.adId as string;
  const [ad, setAd] = useState<AdvertisementUnion>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarURL, setAvatarURL] = useState<string>();
  const [adPhotoURLs, setAdPhotoURLs] = useState<string[]>([]);

  // Настройки карусели изображений
  const settings = {
    dots: true, // Отображаются ли точки навигации?
    infinite: true, // Бесконечная прокрутка?
    speed: 500, // Скорость анимации
    slidesToShow: 1, // Сколько слайдов показывать
    slidesToScroll: 1, // Сколько слайдов прокручивать
    arrows: false, // Отключены стрелки
  };

  // Получаем информацию об объявлении
  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        if (!meatType || !adId) throw new Error("Не указаны параметры объявления!");
        const data = await getAdvertisementById(meatType, adId);
        setAd(data);
      }
      catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Непредвиденная ошибка загрузки объявлений!");
      }
    };
    fetchAdvertisement();
  }, [meatType, adId]);


  // Получаем аватарку пользователя
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const filename = ad?.sellerUser?.photo?.path || "Default avatar.jpg";
        const response = await fetch(`/api/download?filename=${filename}`);
        if (!response.ok) {
          setError("Ошибка получения аватарки пользователя!");
        }
        const data = await response.json();
        setAvatarURL(data.data.url);
      } 
      catch (error) {
        setError("Ошибка получения аватарки пользователя!");
      }
    };
    if (ad) fetchFile();
  }, [ad]);
  

  // Получаем изображения объявления
  useEffect(() => {
    const fetchAdPhoto = async () => {
      try {
        const filename = ad?.files;
        const urls = [];
        if (filename == undefined || filename.length === 0) {
          const defaultPhoto = "default-adv-image.jpg";
          const response = await fetch(`/api/download?filename=${defaultPhoto}`);
          if (!response.ok) throw new Error("Ошибка получения фотографии объявления по умолчанию!");
          const data = await response.json();
          urls.push(data.data.url);
        }
        else {
          for (let i = 0; i < filename.length; i++) {
            const response = await fetch(`/api/download?filename=${filename[i].path}`);
            if (!response.ok) throw new Error(`Ошибка получения ${i}-той фотографии объявления!`);
            const data = await response.json();
            urls.push(data.data.url);
          }
        }
        setAdPhotoURLs(urls);
      } 
      catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Непредвиденная ошибка загрузки объявлений!");
      } 
      finally {
        setLoading(false);
      }
    };
    if (ad) fetchAdPhoto();
  }, [ad]);


  if (loading) {
    return (
      <><CustomSpinner mt={5}/></>
    );
  }

  if (error || !ad) {
    return (
      <div className="p-6 flex flex-col items-center justify-center">
        <p className="text-2xl">Не удалось загрузить данные объявления!</p>
        <p className="text-red-500">{error}</p>
        <button onClick={() => router.back()} className="mt-4 underline mx-auto">Назад</button>
      </div>
    );
  }


  return (
    <>
      {/* <DevGridLg/> */}

      <div className="w-4/5 max-w-screen-lg mx-auto">
        <div className="grid grid-cols-12 gap-x-4 mt-2">

          <div className="col-span-2 col-end-13"><ReturnButton text="На главную" size={25} onClick={() => router.back()}/></div>
        
          {/* Изображения объявления */}
          <div className="col-span-4 col-start-1 pl-1 pt-4">
            {adPhotoURLs.length > 1 ? (
            // Слайдер для нескольких изображений
              <div className="pb-8">
                <Slider {...settings}>
                  {adPhotoURLs.map((url, index) => (
                    <div key={`${ad.id}-${index}`} className="pr-1">
                      <div className="h-48 w-full border-2 border-gray-500 rounded-xl overflow-hidden aspect-square relative">
                        <Image
                          src={url}
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
            ) : adPhotoURLs.length === 1 ? (
            // Одиночное изображение без слайдера
              <div className="pr-1 pb-4">
                <div className="h-48 w-full border-2 border-gray-500 rounded-xl overflow-hidden aspect-square relative">
                  <Image
                    src={adPhotoURLs[0]}
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
                    src={adPhotoURLs[0]}
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
          <div className="col-span-5 col-start-5 mt-4">
            {/* Общее */}
            <p className="text-xl">{ad.title}</p>
            <p className="mt-1">{ad.weight + " кг" || "Не указано"}</p>
            <p className="mt-1">{ad.location}</p>
            <p className="mt-1">Количество: {ad.quantity + " шт"}</p>
            <p className="mt-1">Порода: {ad.breed || "не указано"}</p> {/* Порода */}
            <p className="mt-1">Возраст: {ad.monthsAge + " месяца" || "не указано"}</p>
            <p className="mt-1">Медицинский сертификат: {ad.hasMedicalCertificate ? "есть" : "нет"}</p>
            {/* Индивидуальные поля */}
            {"feedingType" in ad ? (<p className="mt-1">Тип корма: {ad.feedingType}</p>) : <></>}
            {"cuttingType" in ad ? (<p className="mt-1">Тип нарезки: {ad.cuttingType}</p>) : <></>}
            {"birdType" in ad ? (<p className="mt-1">Тип птицы: {ad.birdType}</p>) : <></>}
            {"fatContent" in ad ? (<p className="mt-1">Степень жирности: {ad.fatContent}</p>) : <></>}
            {"processingType" in ad ? (<p className="mt-1">Обработка мяса: {ad.processingType}</p>) : <></>}
            {"animalType" in ad ? (<p className="mt-1">Тип животного: {ad.animalType}</p>) : <></>}      
            {/* Остальное */}
            <p className="mt-1">Описание:</p>
            <div className="border-2 rounded-xl border-gray-500 min-h-32">
              <p className="px-2 py-0.5">{ad.description}</p>
            </div>
            <p className="mt-4 w-[120px] text-xl text-center bg-green-400 p-1 rounded-lg">{ad.price} р/кг</p>
          </div>

          
          {/* Владелец объявления и доп. информация */}
          <div className="col-start-10 col-end-13 grid grid-cols-subgrid gap-x-4 content-start mt-4">
            <div className="col-span-3 flex flex-row items-center gap-x-3 p-1">            
              {/* По какой то причине некоторые картинки могут отображатся в аватарах с плохим качеством.
                  Я потратил много времени, чтоб понять почему так, но результатов это не дало. И дело не в либе,
                  с другими либами также. Есть 2 предположения почему так может происходить:
                  1. Изменение/ограничение размеров компонента или картинки не стандартными либовскими средствами, что ломает рендер.
                  2. Сами изображения шакальные и некорректно рендерятся. */}
              <Avatar isBordered size="lg" src={avatarURL}/>
              <p className="text-md whitespace-nowrap">{`${ad.sellerUser?.name || "Безымянный"} ${ad.sellerUser?.surname || ""}`}</p>
            </div>

            <div className="col-span-2 text-center mt-5">
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
    </>
  );
};