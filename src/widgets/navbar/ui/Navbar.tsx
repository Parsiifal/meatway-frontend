"use client";
import { Navbar } from "@heroui/navbar";
import { useNavbar } from "../context/NavbarContext";
import { usePathname } from "next/navigation";
import { LeftNavbarSector } from "./LeftNavbarSector/LeftNavbarSector";
import { RightNavbarSector } from "./RightNavbarSector/RightNavbarSector";
import { CenrtalNavbarSector } from "./CentralNavbarSector/CentralNavbarSector";

export const NavbarShowcase = () => {
  const { navbarClass } = useNavbar();
  const pathname = usePathname();

  // Скрывает отображение навбара на страницах входа и регистрации
  const hideNavbarPaths = ["/auth/login", "/auth/registration"];
  if (hideNavbarPaths.includes(pathname)) {
    return null;
  }

  return (
    <Navbar isBordered maxWidth="full" className={`${navbarClass} transition-none`}>
      {/* Левая часть: лого, название, поиск */}
      <LeftNavbarSector/>
      {/* Центральная часть: страницы */}
      <CenrtalNavbarSector/>
      {/* Правая часть: вход, меню */}
      <RightNavbarSector/>
    </Navbar>
  );
};
