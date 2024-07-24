import WOW from "wow.js";
import { useLayoutEffect } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import World from "./components/World";
import Cards from "./components/Cards";
import Efficient from "./components/Efficient";
import Aniwords from "./components/AniWords";
import AnotherCards from "./components/AnotherCards";
import Incentive from "./components/Incentive";
import HowToUse from "./components/HowToUse";
import RoadMap from "./components/RoadMap";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import { isSafariBrowser } from "~/utils";
import s from "./index.module.less";
import "animate.css/animate.min.css";

export default function Home() {
  useLayoutEffect(() => {
    const wow = new WOW({
      mobile: true,
    });
    if (!isSafariBrowser()) {
      wow.init();
    } else {
      console.log("is safari");
    }
  }, []);
  const renderComp = (children: ReactNode, bg = "", other = "") => {
    return (
      <div className={`w-full ${bg}`}>
        <div className={`max-w-[1440px] mx-auto ${other}`}>{children}</div>
      </div>
    );
  };
  return (
    <div className="relative">
      <div className={s.home}></div>
      {renderComp(<Header />)}
      <div className="w-full overflow-hidden">{renderComp(<HomePage />, "", "")}</div>
      {renderComp(<World />)}
      {renderComp(<Cards />)}

      {renderComp(<Efficient />)}
      {renderComp(<Aniwords />)}
      {renderComp(<AnotherCards />, "lg:mt-[-60px]")}
      {renderComp(<Incentive />)}
      <HowToUse />
      {renderComp(<RoadMap />, "bg-[white]")}
      {renderComp(<Footer />)}
    </div>
  );
}
