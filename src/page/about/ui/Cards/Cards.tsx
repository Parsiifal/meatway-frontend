"use client"; 
import { Card, CardHeader, Image } from "@heroui/react";
import Card1 from "../../assets/Card1.png";
import Card2 from "../../assets/Card2.png";
import Card3 from "../../assets/Card3.png";
import Card4 from "../../assets/Card4.png";

export const Cards = () => {
  return (
    <div className="mt-8 mb-20 max-w-5/6 gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-8">

      <Card className="h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <h4 className="text-white font-medium text-large">Зарегистрируйтесь</h4>
        </CardHeader>
        <Image removeWrapper src={Card1.src} alt="Card1 background" className="z-0 w-full h-full object-cover"/>
      </Card>

      <Card className="h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <h4 className="text-white font-medium text-large">Разместите объявление</h4>
        </CardHeader>
        <Image removeWrapper alt="Card2 background" className="z-0 w-full h-full object-cover" src={Card2.src}/>
      </Card>

      <Card className="h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <h4 className="text-white font-medium text-large">Договоритесь с покупателем</h4>
        </CardHeader>
        <Image removeWrapper alt="Card3 background" className="z-0 w-full h-full object-cover" src={Card3.src}/>
      </Card>

      <Card className="h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <h4 className="text-white font-medium text-large">Доставьте мясо сами</h4>
          <p className="text-tiny text-white/80 uppercase font-bold">или воспользуйтесь нашим сервисом доставки</p>
        </CardHeader>
        <Image removeWrapper alt="Card4 background" className="z-0 w-full h-full object-cover" src={Card4.src}/>
      </Card>

    </div>
  );
};