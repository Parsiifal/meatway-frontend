"use client";
import { createContext, useContext, useState } from "react";

type NavbarContextType = {
  navbarClass: string
  setNavbarClass: (className: string) => void
}

const NavbarContext = createContext<NavbarContextType>({
  navbarClass: "bg-white",
  setNavbarClass: () => {},
});

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [navbarClass, setNavbarClass] = useState("bg-white");
  
  return (
    <NavbarContext.Provider value={{ navbarClass, setNavbarClass }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);