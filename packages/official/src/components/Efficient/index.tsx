import { ReactComponent as SvgEfficient } from "/public/efficient.svg";
import imgCube from "/public/icon-cube.png";
import imgFlex from "/public/icon-e-flex.png"; // todo 3x
import imgAffo from "/public/icon-e-affo.png";
import imgScal from "/public/icon-e-scal.png";

export default function Efficient() {
  const list = [
    {
      title: "Flexible",
      content: "The network is easily configurable, and itcan also cater to dynamic deployment",
      url: imgFlex,
      key: 1,
    },
    {
      title: "Affordable",
      content: "Directly reaching Idle computingresource means competitive price",
      url: imgAffo,
      key: 2,
    },
    {
      title: "Scalable",
      content:
        "As a global open network, Capell isdesigned with a scalable architecture.allowing it to easily accommodate growth indata traffic and user demands.",
      url: imgScal,
      key: 3,
    },
  ];
  return (
    <div className="lg:pt-[100px] pt-[52px] pb-[52px] lg:px-[60px] xl:px-[100px] xl:mb-[50px]">
      <div className="relative text-center w-fit mx-auto mb-[80px] wow animate__animated animate__fadeInUp">
        <span className="font-500 lg:text-[60px] text-[30px] leading-[33px] lg:leading-[66px] relative z-10">
          Efficient
        </span>
        <SvgEfficient className="absolute top-[50%] -translate-y-1/2 right-[-53px]" />
      </div>
      <div className="flex justify-between flex-col lg:flex-row lg:items-start items-center">
        <img
          className="xl:w-[600px] xl:h-[460px] lg:w-[480px] lg:h-[368px] w-[300px] h-[230px] wow animate__animated animate__fadeIn"
          src={imgCube}
          alt=""
        />
        <div className="max-w-[560px] lg:w-full w-[375px]">
          {list.map(({ title, content, url, key }) => (
            <div
              key={key}
              style={{
                animationDuration: "0.7s",
              }}
              className="flex px-6 py-8 gap-6 w-full hover:bg-hoverLinear cursor-default hover:rounded-[12px] wow animate__animated animate__fadeInRightSelf"
            >
              <img className="w-[60px] h-[60px]" src={url} alt="" />
              <div className="flex-1">
                <p className="mb-2 font-400 text-16 leading-[28px] lg:text-24 lg:leading-[32px]">{title}</p>
                <p className="font-300 text-14 leading-[24px] text-text-4">{content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
