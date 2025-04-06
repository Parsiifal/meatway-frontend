import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem } from "@heroui/navbar";
import { Input } from "@heroui/input";
import { LogoIcon, SearchIcon } from "@/shared/ui/icons"

export const LeftSide = () => {
    return (
        <div>
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
        </div>
    );
};