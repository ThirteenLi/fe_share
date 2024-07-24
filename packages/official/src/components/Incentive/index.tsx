import { ReactComponent as SvgEfficient } from "/public/efficient.svg";
import imgUrl from "/public/img-incentive.png";
import { ReactComponent as SvgToken } from "/public/icon-dualtoken.svg";
import { ReactComponent as SvgJoin } from "/public/icon-easy-join.svg";

export default function Incentive() {
  const list = [
    {
      title: "Esay to Join",
      content: "ldle computing resources from anywhere can be monetized byfew steps.",
      icon: <SvgJoin />,
      key: 1,
    },
    {
      title: "DualToken Model",
      content: "Dual benefits include stable income based on fiat currency andtoken with potential high return",
      icon: <SvgToken />,
      key: 2,
    },
  ];
  return (
    <div className="xl:pt-[100px] lg:pt-[52px] lg:px-[60px] xl:px-[100px]">
      <div className="relative text-center w-fit mx-auto mb-[60px] wow animate__fadeInUp animate__animated">
        <span className="font-500 lg:text-[60px] lg:leading-[66px] text-[30px] leading-[33px] relative z-10">
          Incentive
        </span>
        <SvgEfficient className="absolute top-[50%] -translate-y-1/2 right-[-53px]" />
      </div>
      <div className="flex items-center xl:gap-[80px] justify-between lg:flex-row flex-col-reverse">
        <div className="lg:flex-1 xl:max-w-[560px] lg:max-w-[424px] lg:w-full md:w-[58.59375%] w-[375px]">
          {list.map(({ title, content, icon, key }) => (
            <div
              key={key}
              style={{ animationDuration: "0.7s" }}
              className="flex px-6 lg:py-8 py-6 gap-6 w-full hover:bg-hoverLinear cursor-default hover:rounded-[12px] wow animate__animated animate__fadeInLeftSelf"
            >
              {icon}
              <div className="flex-1">
                <p className="mb-2 font-400 lg:text-24 text-16 leading-[28px] lg:leading-[32px]">{title}</p>
                <p className="font-300 text-14 leading-[24px] text-text-4">{content}</p>
              </div>
            </div>
          ))}
        </div>
        <img
          src={imgUrl}
          className="xl:w-[600px] xl:h-[460px] lg:w-[480px] lg:h-[368px] w-[300px] h-[230px] lg:mb-0 mb-[20px] wow animate__animated animate__fadeIn"
          alt=""
        />
      </div>
    </div>
  );
}
