import { TopCard } from "./TopCard/TopCard";
import { AboutText } from "./AboutText/AboutText";
import { Cards } from "./Cards/Cards";

export const AboutPage = () => {
  return (
    <div className="bg-orange-400">
      <div className="flex flex-col items-center ml-20 mr-20 border border-green-400">
        <TopCard/>
        <AboutText/>
        <p className="text-4xl mt-16">Удобно и надежно</p>
        <Cards/>
      </div>
    </div>
  );
};