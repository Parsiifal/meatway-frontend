import { LocationIcon } from "@/shared/ui";
import "../MainPage.css";
import { Button } from "@heroui/button";

interface ButtonsMeatTypeProps {
  onSelect: (meatType: string) => void;
}

// Кнопки выбора мяса
export const ButtonsMeatType = ({ onSelect }: ButtonsMeatTypeProps) => {
  return (
    <div className="gridLg mt-6 h-16 border border-blue-400">
            
      <Button disableRipple onPress={() => onSelect("all")} className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Все</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("beef")} className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Говядина</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("sheepmeat")} className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Баранина</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("pork")} className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Свинина</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("bird")} className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Птица</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("specialmeat")} className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Разное</p>
      </Button>

    </div>
  );
};