"use client";
import { Navbar } from "@heroui/navbar";
import { useNavbar } from "../context/NavbarContext";
import { LeftNavbarSector } from "./LeftNavbarSector/LeftNavbarSector";
import { RightNavbarSector } from "./RightNavbarSector/RightNavbarSector";
import { CenrtalNavbarSector } from "./CentralNavbarSector/CentralNavbarSector";

export const NavbarShowcase = () => {
  const { navbarClass } = useNavbar();

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
