"use client"
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem } from "@heroui/navbar"
import { Input } from "@heroui/input"
import Link from "next/link"
import { Button } from "@heroui/button"
import { LeftSide } from "./LeftSide/LeftSide"

import {DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react"

// Динамический импорт компонента Dropdown с отключенным серверным рендерингом (SSR)
import dynamic from 'next/dynamic';
import { HeartIcon, SearchIcon, LogoIcon, MenuIcon } from "@/shared/ui/icons"
const Dropdown = dynamic(() => import('@heroui/dropdown').then((c) => c.Dropdown), {ssr: false});


export const NavbarShowcase = () => {
    return (
      <Navbar isBordered maxWidth="full">

        {/* Левая часть: лого, название, поиск */}
        <NavbarContent justify="start">
          <NavbarItem className="flex gap-5">
            <NavbarBrand >
              <LogoIcon />
              <p className="font-bold text-inherit text-xl ml-2">MeatWay</p>
            </NavbarBrand>

            <Input
              classNames={{
                base: "max-w-full sm:max-w-[15rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Поиск по объявлениям"
              size="sm"
              startContent={<SearchIcon size={20} stroke="#0ea5e9" strokeWidth={2}/>}
              type="search"
            />
          </NavbarItem>
        </NavbarContent>

        {/* Центральная часть: страницы */}  
        <NavbarContent justify="center">

          <NavbarItem>
            <Button disableRipple variant="light" className="flex flex-col items-center justify-center gap-y-0.5 h-12 py-1 hover:text-red-500 hover:!bg-transparent">
              <HeartIcon size={25} />
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

        {/* Правая часть: вход, меню */}  
        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
                <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
                <Button as={Link} color="success" href="#" variant="flat">Sign Up</Button>
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

      </Navbar>
    );
}
  