import Bull from "../../assets/Bull.png";
import Image from "next/image";

export const TopCard = () => {
  return (
    <div className="flex w-full justify-center items-center mt-10 gap-12 border border-red-400 bg-gradient-to-br from-orange-600 from-30% to-black to-70%">

      <div className="max-w-[552px] flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold text-justify">Мясо по справедливым ценам</h1>
        <p className="text-xl text-justify">
          Meatway помогает купить или продать мясо без посредников и коммерсантов.
          Мы связываем поставщиков мяса с их покупателями.
        </p>
      </div>

      <div>
        <Image src={Bull} alt="Bull" width={800}/>
      </div>

    </div>
  );
};