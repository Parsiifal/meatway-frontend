import { NavbarContent, NavbarItem } from "@heroui/react";
import { Button } from "@heroui/button";
import { HeartIcon, MessageIcon, ISaleIcon, LocationIcon, CaseIcon } from "@/shared/ui/icons";
//import Link from "next/link";
import "./CenrtalNavbarSector.css";

export const CenrtalNavbarSector = () => {
  return (
    <NavbarContent justify="center">
      {/* Центральная часть: страницы */}

      <NavbarItem>
        <Button disableRipple variant="light" className="btnBase hover:text-red-500">
          <HeartIcon size={25}/>
          <span className="text-xs">Избранное</span>
        </Button>
      </NavbarItem>

      <NavbarItem>
        <Button disableRipple variant="light" className="btnBase hover:text-sky-600">
          <MessageIcon size={25}/>
          <span className="text-xs">Сообщения</span>
        </Button>
      </NavbarItem>

      <NavbarItem>
        <Button disableRipple variant="light" className="btnBase hover:text-green-600">
          <ISaleIcon size={25}/>
          <span className="text-xs">Я продаю</span>
        </Button>
      </NavbarItem>

      <NavbarItem>
        <Button disableRipple variant="light" className="btnBase hover:text-orange-600">
          <LocationIcon size={22}/>
          <span className="text-xs">На карте</span>
        </Button>
      </NavbarItem>

      <NavbarItem>
        <Button disableRipple variant="light" className="btnBase hover:text-indigo-600">
          <CaseIcon size={22}/>
          <span className="text-xs">Для бизнеса</span>
        </Button>
      </NavbarItem>

    </NavbarContent>
  );
};
