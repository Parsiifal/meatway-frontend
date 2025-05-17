"use client";
import { useRouter } from "next/navigation";
import { FilePath } from "@/page/main/model/advertisementTypes";
import { useRef, useState } from "react";
import { addToast, Button, Checkbox, Form, Input, Select, SelectItem, Textarea, type SharedSelection } from "@heroui/react";
import { ReturnButton } from "@/shared/ui/components/ReturnButton";
import { createAd } from "../api/createAd";
import { UploadResponse } from "@/page/account/model/types";
//import { DevGridLg } from "@/shared/dev/DevGridLg";

export const CreateAd = () => {

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [meatType, setMeatType] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      const rawData = Object.fromEntries(formData.entries());
      // Нужно отпарсить все НЕ строковые значения, так как FormData собирает их все в виде строк
      const baseData = {
        ...rawData,
        weight: parseInt(rawData.weight as string, 10),
        quantity: parseInt(rawData.quantity as string, 10),
        monthsAge: parseInt(rawData.monthsAge as string, 10),
        price: parseInt(rawData.price as string, 10),
        hasMedicalCertificate: rawData.hasMedicalCertificate === "true",
        isFrozen: rawData.isFrozen === "true",
        isRetail: rawData.isRetail === "true",
      };
      // Нужно вынести в отдельные данные, так как это индивидуальные поля для некоторых типов
      const beefData = {
        isHalal: rawData.isHalal === "true",
        isMramor: rawData.isMramor === "true",
      };
      const sheepAndSpecialData = {
        isHalal: rawData.isHalal === "true",
      };
      
      // Объединяем данные для нужных типов
      let parsedData;
      if (meatType === "beef") parsedData = { ...baseData, ...beefData };
      else if (meatType === "sheepmeat" || meatType === "specialmeat") parsedData = { ...baseData, ...sheepAndSpecialData };
      else parsedData = baseData;

      let uploadedFileNames: string[] = [];
      // Загружаем файлы в Minio, если они есть
      if (selectedFiles.length > 0) {
        const filesData = new FormData();
        selectedFiles.forEach(file => {filesData.append("files", file);});

        const response = await fetch("/api/upload", {
          method: "POST",
          body: filesData,
        });
        if (!response.ok) throw new Error("Ошибка загрузки файлов в хранилище!");

        const result: UploadResponse = await response.json();

        if (result.status === "success" && result.data) {
          uploadedFileNames = result.data.map(file => file.fileName);

        } 
        else {
          throw new Error("Не удалось загрузить фото объявления!");
        }




      }

      // Собираем только имена файлов в FilePath[]
      const filePaths: FilePath[] = uploadedFileNames.map(name => ({ path: name, }));
      // Включаем files в данные
      parsedData = { ...parsedData, files: filePaths };
  
      //console.log(Object.getPrototypeOf(parsedData) === Object.prototype);
      
      //const ad = JSON.parse(json) as AdvertisementUnion;
      //console.warn(ad);

      const json = JSON.stringify(parsedData);
      console.warn(json);
      const success = await createAd(json, meatType);
      if (success) {
        addToast({ title: "Объявление создано", color: "primary", variant: "solid", timeout: 3500, 
          classNames: { base: "mt-[6vh]", title: "text-md" } });
        router.push("/main");
      }
      else throw new Error ("Непредвиденная ошибка создания объявления!");
    } 
    catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Непредвиденная ошибка создания объявления!");
    };
  };

  // При выборе типа мяса
  const handleSelectChange = (keys: SharedSelection) => {
    if (keys === "all") return;
    const [first] = Array.from(keys);
    setMeatType(first as string);
  };

  // Вызывается при выборе файлов
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;
    setSelectedFiles(prev => [...prev, ...Array.from(files)]);
    // Очищаем input, чтобы повторный выбор тех же файлов сработал
    e.currentTarget.value = "";
  };

  return (
    <>
      {/* <DevGridLg/> */}

      <div className="w-4/5 max-w-screen-lg mx-auto">
        <div className="grid grid-cols-12 gap-x-4 grid-flow-row-dense mt-2 mb-20">

          <div className="col-span-2 col-end-13"><ReturnButton text="На главную" size={25} onClick={() => router.back()}/></div>

          <div className="col-span-6 col-start-4">
            <Form onSubmit={handleSubmit}>
              {error && (<p className="text-lg text-red-500 mx-auto">{error}</p>)}
              <p className="font-semibold text-lg">Заполните объявление</p>

              {/* Общие поля */}
              <Input name="title" placeholder="Название" type="text" isRequired variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              <Select name="meatType" size="sm" label="Тип мяса" isRequired selectedKeys={new Set([meatType])} onSelectionChange={handleSelectChange}>
                <SelectItem key="beef">Говядина</SelectItem>
                <SelectItem key="bird">Птица</SelectItem>
                <SelectItem key="pork">Свинина</SelectItem>
                <SelectItem key="sheepmeat">Баранина</SelectItem>
                <SelectItem key="specialmeat">Другое</SelectItem>
              </Select>
              <Input name="weight" placeholder="Вес в кг" type="number" isRequired variant="underlined" size="sm" 
                classNames={{ base: ["mt-1"], input: ["text-md"] }} validate={(value) => {
                  const numValue = parseInt(value);
                  if (numValue < 1) return "Введите положительное число!";
                  if (!Number.isInteger(parseFloat(value))) return "Введите целое положительное число!";
                  if (value.length > 3) return "Ты слона продаешь что-ли?";
                  return null;
                }}/>
              <Input name="location" placeholder="Местоположение" type="text" isRequired variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              <Checkbox name="hasMedicalCertificate" size="md">Наличие медицинского сертификата</Checkbox>
              <Checkbox name="isFrozen" size="md">Замороженое</Checkbox>
              <Checkbox name="isRetail" size="md">В розницу</Checkbox>
              <Input name="quantity" placeholder="Количество" type="number" isRequired variant="underlined" size="sm" 
                classNames={{ base: ["mt-1"], input: ["text-md"] }} validate={(value) => {
                  const numValue = parseInt(value);
                  if (numValue < 1) return "Введите положительное число!";
                  if (!Number.isInteger(parseFloat(value))) return "Введите целое положительное число!";
                  if (value.length > 3) return "Откуда столько?? Где сп***ил?";
                  return null;
                }}/>
              <Input name="breed" placeholder="Порода" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              <Input name="monthsAge" placeholder="Возраст (месяцев)" type="number" variant="underlined" size="sm" 
                classNames={{ base: ["mt-1"], input: ["text-md"] }} validate={(value) => {
                  const numValue = parseInt(value);
                  if (numValue < 1) return "Введите положительное число!";
                  if (!Number.isInteger(parseFloat(value))) return "Введите целое положительное число!";
                  if (value.length > 3) return "Ты там что, пыль продаешь?";
                  return null;
                }}/>
              
              {/* Индивидуальные поля */}
              {meatType === "beef" && (<>
                <Checkbox name="isHalal" size="md">Халяль</Checkbox>
                <Checkbox name="isMramor" size="md">Мраморное</Checkbox>
                <Input name="feedingType" placeholder="Тип корма" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
                <Input name="cuttingType" placeholder="Тип нарезки" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              </>)}
              {meatType === "bird" && (<>
                <Input name="birdType" placeholder="Тип птицы" type="text" isRequired variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              </>)}
              {meatType === "pork" && (<>
                <Input name="fatContent" placeholder="Степень жирности" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
                <Input name="processingType" placeholder="Обработка мяса" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              </>)}
              {meatType === "sheepmeat" && (<>
                <Checkbox name="isHalal" size="md">Халяль</Checkbox>
                <Input name="feedingType" placeholder="Тип корма" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
                <Input name="cuttingType" placeholder="Тип нарезки" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              </>)}
              {meatType === "specialmeat" && (<>
                <Checkbox name="isHalal" size="md">Халяль</Checkbox>
                <Input name="animalType" placeholder="Тип животного" type="text" isRequired variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
                <Input name="feedingType" placeholder="Тип корма" type="text" variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}/>
              </>)}

              {/* Описание и цена */}
              <p className="mt-1">Описание:</p>
              <Textarea name="description" placeholder="Введите описание товара" minRows={4} maxRows={5} isRequired 
                classNames={{ inputWrapper: "border-2 border-gray-500", }}/>
              <Input name="price" placeholder="Цена за кг" type="number" isRequired variant="underlined" size="sm" classNames={{ base: ["mt-1"], input: ["text-md"] }}
                validate={(value) => {
                  const numValue = parseInt(value);
                  if (numValue < 1) return "Введите положительное число!";
                  if (!Number.isInteger(parseFloat(value))) return "Введите целое положительное число!";
                  if (value.length > 4) return "Ну куда такую цену то гнешь, совесть есть?";
                  return null;
                }}/>

              {/* Загрузка фото */}
              <input
                ref={fileInputRef}
                type="file"
                multiple // разрешаем выбирать сразу несколько
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Выбрать фото
              </Button>
              {/* Список выбранных файлов */}
              {selectedFiles.length > 0 && (
                <div className="border p-2">
                  <h4 className="font-semibold mb-2">Выбранные файлы:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedFiles.map((file, idx) => (
                      <li key={`${file.name}-${idx}`}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button type="submit" className="p-3 rounded-md bg-blue-500 text-white hover:bg-blue-800 mt-5">Создать объявление</Button>
            </Form>
          </div>

        </div>
      </div>
    </>
  );
};