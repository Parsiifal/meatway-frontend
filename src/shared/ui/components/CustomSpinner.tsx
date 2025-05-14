import { Spinner } from "@heroui/react";
import { useEffect } from "react";

export const CustomSpinner = ({ mt = 1, ...props }) => {
  useEffect(() => {
    // Блокировка скролла для избегания дрожания
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div 
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        paddingTop: `${mt}rem`,
      }}
      {...props}>
      <Spinner size="lg"/>
    </div>
  );
};