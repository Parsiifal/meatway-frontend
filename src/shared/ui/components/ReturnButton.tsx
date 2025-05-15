import { Button } from "@heroui/react";
import { BackIcon } from "../icons/BackIcon";

type ButtonProps = {
  onClick?: () => void;
};

export const ReturnButton = ({ text, size, ...buttonProps }: {text: string, size: number} & ButtonProps) => {
  return (
    <>
      <Button disableRipple startContent={<BackIcon size={size}/>} variant="light" {...buttonProps} 
        className="hover:!bg-transparent hover:text-sky-600">
        {text}
      </Button>
    </>
  );
};