import Bull from "../../assets/Bull.png";
import Image from "next/image";

export const TopCard = () => {
  return (
    <div className="flex w-full justify-center items-center gap-14 border-8 rounded-3xl border-black bg-gradient-to-br from-orange-600 from-30% to-black to-70%">

      <div className="max-w-[551px] flex flex-col gap-4 relative -top-10 ml-10 mt-5">
        <h1 className="font-bold text-justify text-zinc-100 sm:text-base md:text-xl lg:text-2xl xl:text-4xl">Мясо по справедливым ценам</h1>
        <p className="text-justify text-zinc-100 sm:text-sm md:text-base lg:text-lg xl:text-2xl">
          Meatway помогает купить или продать мясо без посредников и коммерсантов.
          Мы связываем поставщиков мяса с их покупателями.
        </p>
      </div>

      <div className="mt-5">
        <Image src={Bull} alt="Bull" width={800} className="drop-shadow-2xl"/>
      </div>

    </div>
  );
};