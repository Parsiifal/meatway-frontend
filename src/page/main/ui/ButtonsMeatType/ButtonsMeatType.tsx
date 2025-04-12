import { LocationIcon } from "@/shared/ui/icons";
import "../MainPage.css";
import { Button } from "@heroui/button";

// Кнопки выбора мяса
export const ButtonsMeatType = () => {
  return (
    <div className="gridLg  mt-6 h-16 border border-blue-400">
            
      <Button disableRipple className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Все</p>
      </Button>

      <Button disableRipple className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Говядина</p>
      </Button>

      <Button disableRipple className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Баранина</p>
      </Button>

      <Button disableRipple className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Свинина</p>
      </Button>

      <Button disableRipple className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Птица</p>
      </Button>

      <Button disableRipple className="btnMeatType">
        <LocationIcon size={20}/>
        <p>Разное</p>
      </Button>

    </div>
  );
};