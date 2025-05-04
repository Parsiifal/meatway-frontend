"use client";
import { MenuIcon } from "@/shared/ui";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { User } from "@heroui/user";
import { Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "@/page/auth/api/actions";
import Link from "next/link";
import { getUserData } from "@/page/account/api/getUserData";
import { UserDataType } from "@/page/account/model/types";

// Короч получить все данные пользователя и кинуть запрос на апи роут чтоб получить юрл картинки.
export const RightNavbarSector = (() => {

  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [avatar, setAvatar] = useState();

  // Проверить аутентификацию
  const checkAuth = async () => {
    try {
      const status = await isLoggedIn();
      setAuthStatus(status ? "authenticated" : "unauthenticated");
    } 
    catch (error) {
      setAuthStatus("unauthenticated");
    }
  };
  useEffect(() => {checkAuth();}, []);

  // Получить данные и аватарку пользователя
  // В идеале для получения аватарки пользовтеля создать отдельную функцию, 
  // которую использовать и в странице аккаунта, но пока так
  const getDataAndAvatar = async () => {
    try {
      const data = await getUserData(); // Получаем данные пользователя
      setUserData(data);

      // Получаем название файла аватарки
      // Тут нужно брать именно с data, потому что userData обновится только по завершении этой функции
      const avatarName = data?.photo?.path || "Default avatar.jpg";
      const response = await fetch(`/api/download?filename=${avatarName}`); // Запрос к API роуту
        
      if (!response.ok) {
        throw new Error("File not found");
      }

      const avatarData = await response.json();
      setAvatar(avatarData.data.url);
    }
    catch (error) {
      throw new Error("Ошибка получения данных или аватарки в навбаре!");
    }
  };
  useEffect(() => {if (authStatus === "authenticated") getDataAndAvatar();}, [authStatus]);
  
  // Разлогиниться
  const onPressLogout = () => {
    logout();
    checkAuth();
  }; 

  return (
    <NavbarContent justify="end">
      {/* Правая часть: вход, меню */}

      {authStatus === "loading" ?
        (<div className="flex gap-4">
          <Skeleton className="h-8 w-14 rounded"/>
          <Skeleton className="h-8 w-28 rounded"/>
        </div>) :
        authStatus === "authenticated" ? 
          (<Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: avatar,
                }}
                className="transition-transform"
                name={`${userData?.name || "Безымянный"} ${userData?.surname || ""}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat" disabledKeys={["settings"]}>
              <DropdownItem key="account" href="/account">Мой аккаунт</DropdownItem>
              <DropdownItem key="settings">Настройки аккаунта</DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={onPressLogout}>Выйти</DropdownItem>
            </DropdownMenu>
          </Dropdown>) :
          (<>
            <NavbarItem className="hidden lg:flex">
              <Link href="/auth/login" className="font-semibold hover:text-blue-600">Вход</Link>
            </NavbarItem>
            <NavbarItem> 
              <Button as={Link} color="success" href="/auth/registration" variant="flat">Регистрация</Button>
            </NavbarItem>
          </>)
      }

      <Dropdown>
        <DropdownTrigger>  
          <Button isIconOnly variant="light"><MenuIcon size={28}/></Button>  
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions" disabledKeys={["analytics", "settings", "help"]}>
          <DropdownItem key="home" href="/">DevPage</DropdownItem>
          <DropdownItem key="main" href="/main">Главная</DropdownItem>
          <DropdownItem key="analytics" href="/">Аналитика</DropdownItem>
          <DropdownItem key="settings" href="/">Настройки</DropdownItem>
          <DropdownItem key="help" href="/">Помощь</DropdownItem>
          <DropdownItem key="about" href="/about">О нас</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </NavbarContent> 
  );
});