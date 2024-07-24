import cls from "classnames";
import imgTable from "/public/bg-table.png";
import imgTooltip from "/public/bg-tooltip.png";
import { ReactComponent as SvgArrow } from "/public/icon-arrow.svg";
import s from "./index.module.less";

export default function HomePage() {
  return (
    <div className="xl:pt-[90px] lg:pt-[60px] md:pt-[34px] pt-[20px]">
      <div className="flex  relative lg:flex-row flex-col lg:pb-0 pb-[30px]">
        <div className="font-500 xl:text-[72px] lg:text-[54px] text-[40px] xl:leading-[79px] lg:leading-[59px] leading-[44px] lg:pl-[60px] xl:pt-[43px] lg:pt-[30px] animate__fadeIn animate__animated">
          <p className={cls("w-fit bg-brandLinear lg:mx-0 mx-auto", s.textLinear)}>Decentralisend</p>
          <div className="lg:block flex items-center justify-center md:flex-row flex-col">
            <p className="w-fit lg:mx-0">Edge&nbsp;Computing&nbsp;</p>
            <p className="w-fit lg:mx-0">Platform</p>
          </div>
          <div className="lg:mt-[30px] md:mt-[16px] mt-3 xl:w-[574px] lg:w-[431px] md:w-[580px] w-[343px] lg:mx-0 mx-auto">
            <p className="font-300 text-14 leading-20 text-text-4 lg:text-left text-center">
              Connect idle bandwidth, storage, and other computing resources to provide high-quality, efficient, and
              cost-effective edge computing services.Build the biggest decentralised content distribution network for
              enterprise-level use.
            </p>
          </div>
          <div
            className="hidden md:flex xl:mb-[20px] xl:mt-[94px] lg:mt-[70px] md:mt-[30px] mt-[25px] lg:mx-0 mx-auto items-center text-text-6 gap-4 font-400 lg:text-[22px] text-16 leading-32 lg:h-[64px] h-[60px] lg:w-[211px] md:w-[296px] w-[192px] border border-currentColor justify-center rounded-[12px] cursor-pointer hover:text-text-1 hover:bg-brand-0 hover:border-brand-2 hover:shadow-getbtn"
            onClick={() => {
              window.open("https://node.capell.io/");
            }}
          >
            <span>Get Started</span>
            <SvgArrow />
          </div>
          <div
            className="flex md:hidden cursor-pointer text-text-1 mt-[25px] mx-auto font-400 gap-4 text-[18px] bg-brand-0 border-brand-2 rounded-[12px] w-[192px] h-[60px] justify-center items-center"
            onClick={() => {
              window.open("https://node.capell.io/");
            }}
          >
            <span>Get Started</span>
            <SvgArrow />
          </div>
        </div>
        <div className="lg:absolute relative top-0 right-0 xl:w-[993px] lg:w-[68.958%] overflow-x-hidden lg:overflow-x-visible overflow-y-visible lg:mt-0 mt-[22px]">
          <img
            className="max-w-fit lg:absolute relative lg:w-full w-[794px] xl:right-[-277px] md:right-[-27.895%] md:left-auto left-[16px] top-0 animate__fadeInRight animate__animated"
            src={imgTable}
            style={{ animationDuration: "0.7s" }}
            alt=""
          />
          <div
            className="absolute xl:top-[-37px] top-0 xl:right-[100px] right-0 origin-top-left animate__bounceInRight animate__animated"
            style={{ animationFillMode: "none" }}
          >
            <img src={imgTooltip} className="xl:h-[250px] h-[124px]" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
