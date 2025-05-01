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


export const RightNavbarSector = (() => {

  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  const checkAuth = async () => {
    try {
      const status = await isLoggedIn();
      setAuthStatus(status ? "authenticated" : "unauthenticated");
    } catch (error) {
      setAuthStatus("unauthenticated");
    }
  };

  useEffect(() => {checkAuth();}, []);

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
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                name="Tony Reichert"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="account">Мой аккаунт</DropdownItem>
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
          <DropdownItem key="home" href="/">Домой</DropdownItem>
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