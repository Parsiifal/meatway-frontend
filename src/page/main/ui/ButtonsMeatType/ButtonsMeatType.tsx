import { BeefIcon, BirdIcon, LocationIcon, MeatIcon, PorkIcon, SheepmeatIcon } from "@/shared/ui";
import "../MainPage.css";
import { Button } from "@heroui/button";

interface ButtonsMeatTypeProps {
  onSelect: (meatType: string) => void;
}

// Кнопки выбора мяса
export const ButtonsMeatType = ({ onSelect }: ButtonsMeatTypeProps) => {
  return (
    <div className="gridLg mt-6 h-16">
            
      <Button disableRipple onPress={() => onSelect("all")} className="btnMeatType">
        <MeatIcon/>
        <p>Все</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("beef")} className="btnMeatType">
        <BeefIcon/>
        <p>Говядина</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("sheepmeat")} className="btnMeatType">
        <SheepmeatIcon/>
        <p>Баранина</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("pork")} className="btnMeatType">
        <PorkIcon/>
        <p>Свинина</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("bird")} className="btnMeatType">
        <BirdIcon/>
        <p>Птица</p>
      </Button>

      <Button disableRipple onPress={() => onSelect("specialmeat")} className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Разное</p>
      </Button>

    </div>
  );
};