"use client";
import { TopCard } from "./TopCard/TopCard";
import { AboutText } from "./AboutText/AboutText";
import { Cards } from "./Cards/Cards";
import { useLayoutEffect } from "react";
import { useNavbar } from "@/widgets/navbar/context/NavbarContext";

export const AboutPage = () => {
  const { setNavbarClass } = useNavbar();

  useLayoutEffect (() => {
    setNavbarClass("bg-orange-500"); // Устанавливаем оранжевый фон
    
    return () => {
      setNavbarClass("bg-white"); // Возвращаем стандартный цвет
    };
  }, [setNavbarClass]);

  return (
    <div className="bg-orange-400">
      <div className="pt-5 px-10 h-full min-h-[calc(100vh-80px)]">
        <div className="w-full h-full mx-auto bg-black rounded-2xl shadow-2xl max-w-[1800px]">
          <div className="flex flex-col items-center">
            <TopCard/>
            <AboutText/>
            <p className="font-bold mt-16 text-zinc-100 sm:text-base md:text-xl lg:text-2xl xl:text-4xl">Удобно и надежно</p>
            <Cards/>
          </div>
        </div>
      </div>
    </div>
  );
};