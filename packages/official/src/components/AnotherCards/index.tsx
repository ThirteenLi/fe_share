import cls from "classnames";
import { ReactComponent as SvgI } from "/public/another/icon-1.svg";
import { ReactComponent as SvgII } from "/public/another/icon-2.svg";
import { ReactComponent as SvgIII } from "/public/another/icon-3.svg";
import { ReactComponent as SvgIV } from "/public/another/icon-4.svg";
import s from "./index.module.less";
export default function AnotherCards() {
  const list = [
    {
      icon: <SvgI />,
      key: 1,
      title: "Self-owned Private Key",
      content: "Any process requires user's approval.",
    },
    {
      icon: <SvgII />,
      key: 2,
      title: "Community Surpervison",
      content: "Incentive mechanism ensures that the network is consistently supervised and maintained",
    },
    {
      icon: <SvgIII />,
      key: 3,
      title: "Privacy",
      content: "User's IP and location information are anonymous",
    },
    {
      icon: <SvgIV />,
      key: 4,
      title: "Reliable",
      content: "Virtual machine provides ideaenvironment for data segregation",
    },
  ];

  return (
    <div className="relative z-10 pb-[50px] lg:mb-[50px]">
      <div className="xl:px-[160px] lg:px-[60px] flex items-center flex-wrap lg:justify-between lg:gap-y-[60px] justify-center">
        {list.map(({ icon, key, title, content }) => (
          <div
            key={key}
            className={cls(
              "flex flex-col items-center justify-center lg:h-[222px] h-[204px] lg:w-[50%] md:w-[58.59375%] w-full hover:bg-hoverLinearToB cursor-default hover:rounded-[12px] wow animate__animated animate__fadeIn",
              s.card,
            )}
          >
            <div className="mb-[18px]">{icon}</div>
            <p className="font-400 lg:text-24 lg:leading-[36px] text-16 leading-[28px] text-center">{title}</p>
            <p className="mt-2 font-300 text-text-4 text-14 leading-[20px] text-center max-w-[400px]">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
