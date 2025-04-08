"use client";
import { Navbar } from "@heroui/navbar";
import { LeftNavbarSector } from "./LeftNavbarSector/LeftNavbarSector";
import { RightNavbarSector } from "./RightNavbarSector/RightNavbarSector";
import { CenrtalNavbarSector } from "./CentralNavbarSector/CentralNavbarSector";

export const NavbarShowcase = () => {
  return (
    <Navbar isBordered maxWidth="full">
      {/* Левая часть: лого, название, поиск */}
      <LeftNavbarSector/>
      {/* Центральная часть: страницы */}
      <CenrtalNavbarSector/>
      {/* Правая часть: вход, меню */}
      <RightNavbarSector/>
    </Navbar>
  );
};
