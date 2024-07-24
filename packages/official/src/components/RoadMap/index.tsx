import cls from "classnames";
import s from "./index.module.less";

export default function RoadMap() {
  const list = [
    {
      title: "Q1, 2024",
      content: "Capell testnet launch and first round service node recruiting.",
    },
    {
      title: "Q2, 2024",
      content: "Proceeding R&D on family CDN mining hardware.",
    },
    {
      title: "Q4, 2024",
      content: "Capell main net launch and main network token issuing.",
    },
    {
      title: "Q1, 2025",
      content: "More application scenarios for Capell chain token.",
    },
  ];

  return (
    <div className={cls("xl:py-[100px] lg:py-[50px] py-[25px] lg:px-[60px] px-[30px] text-text-1", s.bg)}>
      <p className="font-500 text-[30px] leading-[33px] lg:text-[60px] lg:leading-[66px] text-center mb-[60px] wow animate__fadeInUp animate__animated">
        Roadmap
      </p>
      <div className="relative lg:h-[550px] md:h-[375px] h-[547px]">
        <div className="absolute top-0 bottom-0 left-[50%] ml-[-0.5px] w-[1px] bg-blackLinear"></div>
        {list.map(({ title, content }, index) => {
          const isLeft = index % 2 === 1;
          return (
            <div
              key={index}
              style={{ animationDuration: "0.7s" }}
              className={cls(
                "flex gap-[10px] relative xl:mb-[42px] mb-[10px] wow animate__animated",
                isLeft
                  ? "flex-row-reverse mr-[50%] right-[-4px] animate__fadeInLeftSelf"
                  : "ml-[50%] left-[-4px] animate__fadeInRightSelf",
              )}
            >
              <div className="mt-4 rounded-full w-2 h-2 bg-brand-0 border border-text-1 shrink-0"></div>
              <div className="mt-5 lg:w-[60px] w-[20px] border-t border-text-1 shrink-0"></div>
              <div
                className={cls(
                  "flex-1 xl:max-w-[546px] lg:max-w-[338px]  md:max-w-[248px] max-w-[127px]",
                  isLeft && "text-right lg:mr-[30px]",
                  !isLeft && "lg:ml-[30px]",
                )}
              >
                <p className="w-full font-500 lg:text-28 text-20 lg:leading-[36px] leading-[32px] text-text-1 mb-2 whitespace-nowrap">
                  {title}
                </p>
                <p className="w-full text-text-3 font-400 lg:text-18 text-12 lg:leading-[32px] leading-[18px]">
                  {content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
