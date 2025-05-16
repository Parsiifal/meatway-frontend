import { NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Input } from "@heroui/input";
import { LogoIcon, SearchIcon } from "@/shared/ui";

export const LeftNavbarSector = () => {
  return (
    <NavbarContent justify="start"> 
      {/* Левая часть: лого, название, поиск */}
      <NavbarItem className="flex gap-5">

        <NavbarBrand>
          <LogoIcon/>
          <p className="ml-2 text-xl font-bold text-inherit">MeatWay</p>
        </NavbarBrand>

        <Input
          classNames={{
            base: "max-w-[210px] max-xl:hidden h-10",
            mainWrapper: "h-full",
            input: "text-sm",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Поиск по объявлениям"
          size="sm"
          startContent={<SearchIcon size={20} stroke="#0ea5e9" strokeWidth={2}/>}
          type="search"
        />

      </NavbarItem>  
    </NavbarContent>
  );
};
