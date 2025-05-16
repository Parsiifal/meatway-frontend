"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getUserData } from "../api/getUserData";
import { UserDataType, UpdateUserDataType, UploadResponse } from "../model/types";
import { Button, Form, Input } from "@heroui/react";
import { updateUserData } from "../api/updateUserData";
import { useRef } from "react";


export const AccountComponent = () => {
  
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [fileData, setFileData] = useState<{ url: string; filename: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false); // для спиннера при изменении аватарки


  // Получение данных пользователя ✅
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } 
      catch (error) {
        setError("Ошибка получения данных пользователя!");
      }
    };
  
    fetchUserData();
  }, []);


  // Получение аватарки пользователя ✅
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const filename = userData?.photo?.path || "Default avatar.jpg";
        const response = await fetch(`/api/download?filename=${filename}`);
        
        if (!response.ok) {
          setError("Ошибка получения аватарки пользователя!");
        }

        const data = await response.json();
        setFileData(data.data);
      } 
      catch (error) {
        setError("Ошибка получения аватарки пользователя!");
      } 
      finally {
        setLoading(false);
      }
    };

    if (userData) fetchFile();
  }, [userData]);
  

  // Обновление данных пользователя ✅
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);

      // Собираем заполненные данные из формы
      const updateFields: UpdateUserDataType = {
        name: formData.get("name")?.toString() || undefined,
        surname: formData.get("surname")?.toString() || undefined,
        city: formData.get("city")?.toString() || undefined,
        phoneNumber: formData.get("phoneNumber")?.toString() || undefined
      };

      await updateUserData(updateFields);
      const freshData = await getUserData();
      setUserData(freshData);
    } 
    catch (error) {
      setError("Ошибка обновления данных пользователя!");
    };
  };


  // Обновление аватарки пользователя ✅
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
      
    if (!fileInputRef.current?.files?.length) return;
    setIsLoading(true);

    const formData = new FormData();
    const files: File[] = Array.from(fileInputRef.current.files);
    files.forEach(file => {formData.append("files", file);});
      
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError("Ошибка загрузки новой аватарки в хранилище!");
      }

      const result: UploadResponse = await response.json();
  
      // Если аватарка успешно загружена в minio, отправлем на сервер название файла и перезагружаем ее
      if (result.status === "success" && result.data?.[0]) {

        const updateUserAvatar: UpdateUserDataType = {
          photo: { 
            path: result.data[0].fileName
          }
        };
    
        await updateUserData(updateUserAvatar);

        const freshData = await getUserData();
        setUserData(freshData);
        console.info("Uploaded files:", result.data);
      } 
      else {
        console.error("Upload failed:", result.message);
      }
    }
    catch (error) {
      setError("Ошибка обновления аватарки пользователя!");
    }
    finally {
      setIsLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="grid grid-cols-12 gap-x-4 mt-8 animate-pulse">
        <div className="col-span-5 col-start-2 h-72 bg-gray-300 rounded-xl"></div>
        <div className="col-span-5 col-start-7 h-96 bg-gray-300 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 text-red-500 text-center">
        {error}
      </div>
    );
  }

  if (!fileData || !userData) {return null;}

  return (
    <div className="grid grid-cols-12 gap-x-4 mt-8">

      {/* Левый столбец - аватарка и кнопка изменения аватарки */}
      <div className="col-span-5 col-start-2 space-y-4">

        <div className="border-2 border-black rounded-xl overflow-hidden aspect-square relative">
          <Image
            src={fileData.url}
            alt={fileData.filename}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            quality={85}
            style={{
              borderRadius: "0.5rem"
            }}
          />
        </div>

        <div >
          {/* Скрытый input */}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
          />
          {/* Кнопка для открытия диалога выбора файла */}
          <Button
            type="button"
            isLoading={isLoading}
            onPress={() => fileInputRef.current?.click()}
            className="p-3 mt-[9px] rounded-md bg-blue-500 text-white hover:bg-blue-800"
            disabled={isLoading}>
            Изменить аватарку
          </Button>
        </div>
          
      </div>


      {/* Правый столбец - данные */}
      <div className="col-span-5 col-start-7">
        <Form onSubmit={handleSubmit}>
          
          <p className="font-semibold text-lg">Электронная почта</p>
          <p className="font-medium font-sans">{userData?.email}</p>
          <p className="font-semibold mt-3 text-lg">Личные данные</p>
          
          <Input
            defaultValue={userData?.name}
            name="name"
            placeholder="Имя"
            type="text"
            variant="underlined"
            size="sm"
            classNames={{ base: ["mt-1"], input: ["text-md"] }}
          />
          <Input
            defaultValue={userData?.surname}
            name="surname"
            placeholder="Фамилия"
            type="text"
            variant="underlined"
            size="sm"
            classNames={{ base: ["mt-3"], input: ["text-md"] }}
          />
          <Input
            defaultValue={userData?.city}
            name="city"
            placeholder="Город"
            type="text"
            variant="underlined"
            size="sm"
            classNames={{ base: ["mt-3"], input: ["text-md"] }}
          />
          <Input
            defaultValue={userData?.phoneNumber}
            name="phoneNumber"
            placeholder="Номер телефона"
            pattern="^\+?[0-9\s\-\(\)]{7,}$"
            type="tel"
            variant="underlined"
            size="sm"
            classNames={{ base: ["mt-3"], input: ["text-md"] }}
            validate={(value: string, validity?: ValidityState) => {
              // Проверка встроенных ошибок типа
              if (validity?.typeMismatch) {
                return "Введите корректный номер телефона";
              }
              // Проверка на наличие только цифр
              if (value.length !== 0 && !/^\d+$/.test(value)) {
                return "Номер должен содержать только цифры";
              }
              if (value.length !== 0 && value.length !== 11) {
                return "Номер должен содержать 11 цифр";
              }
              return null;
            }}
          />

          <Button type="submit" className="p-3 rounded-md bg-blue-500 text-white hover:bg-blue-800 mt-5">Сохранить изменения</Button>
        </Form>
      </div>

    </div>
  );
};