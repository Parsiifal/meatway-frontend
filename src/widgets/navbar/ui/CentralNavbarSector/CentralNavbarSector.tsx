import { NavbarContent, NavbarItem } from "@heroui/react";
import { Button } from "@heroui/button";
import { HeartIcon } from "@/shared/ui/icons";
import Link from "next/link";

export const CenrtalNavbarSector = () => {
  return (
    <NavbarContent justify="center">
      {/* Центральная часть: страницы */}

      <NavbarItem>
        <Button disableRipple variant="light" className="flex flex-col items-center justify-center gap-y-0.5 h-12 py-1 hover:text-red-500 hover:!bg-transparent">
          <HeartIcon size={25}/>
          <span className="text-xs">Избранное</span>
        </Button>
      </NavbarItem>

      <NavbarItem>
        <Link color="foreground" href="#">Сообщения</Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">Я продаю</Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">На карте</Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">Для бизнеса</Link>
      </NavbarItem>
    </NavbarContent>
  );
};
