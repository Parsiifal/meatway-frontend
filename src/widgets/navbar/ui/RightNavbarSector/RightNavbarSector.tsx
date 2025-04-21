import { MenuIcon } from "@/shared/ui";
import { Button } from "@heroui/button";
import { DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
// Динамический импорт компонента Dropdown с отключенным серверным рендерингом (SSR)
import dynamic from "next/dynamic";
const Dropdown = dynamic(() => import("@heroui/dropdown").then((c) => c.Dropdown), { ssr: false });

export const RightNavbarSector = () => {
  return (
    <NavbarContent justify="end">
      {/* Правая часть: вход, меню */}

      <NavbarItem className="hidden lg:flex">
        <Link href="/auth/login" className="font-semibold hover:text-blue-600">Вход</Link>
      </NavbarItem>
      <NavbarItem> 
        <Button as={Link} color="success" href="/auth/registration" variant="flat">Регистрация</Button>
      </NavbarItem>

      <Dropdown>
        <DropdownTrigger>  
          <Button isIconOnly variant="light"><MenuIcon size={28}/></Button>  
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions" disabledKeys={["analytics", "settings", "help-feedback"]}>
          <DropdownItem key="home" href="/">Home</DropdownItem>
          <DropdownItem key="main" href="/main">Main</DropdownItem>
          <DropdownItem key="analytics" href="/">Analytics</DropdownItem>
          <DropdownItem key="settings" href="/">Settings</DropdownItem>
          <DropdownItem key="help-feedback" href="/">Help & Feedback</DropdownItem>
          <DropdownItem key="about" href="/about">About us</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </NavbarContent> 
  );
};