import cls from "classnames";
import { useRef } from "react";
import CanvasBlock from "./CanvasBlock";
import s from "./index.module.less";

export default function HowToUse() {
  const refContainer = useRef(null);

  const getRadio = () => {
    const dom = refContainer.current;
    if (dom) {
      const rect = dom.getBoundingClientRect();
      const elementBottom = rect.top + rect.height;
      const scrollPosition = window.innerHeight;
      let radio = 0;
      if (rect.top < 0) {
        radio = Math.abs(rect.top) / (rect.height - scrollPosition);
      } else {
        radio = 0;
      }
      if (scrollPosition >= elementBottom) {
        radio = 1;
      }
      return radio;
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className={s.bg}></div>
      <div className="h-[300vh] bg-[white]" ref={refContainer}>
        <div className="bg-[white] text-text-1  sticky top-0 left-0 h-[100vh]">
          <div className={cls("flex w-full items-end h-full")}>
            <div className="mx-auto max-w-[1440px] xl:px-[80px] w-full">
              <p className="font-500 text-center lg:text-[60px] text-[30px] lg:leading-[66px] leading-[33px] mb-4">
                How To Use Capell
              </p>
              <p className="font-300 text-center lg:text-16 text-14 lg:leading-[26px] leading-[21px] opacity-60 max-w-[640px] mx-auto lg:mb-[80px] mb-5">
                Monetize your idle computing resource.Keep a stable network condition, check your wallet and enjoy the
                automaticearning process.
              </p>
              <CanvasBlock getRadio={getRadio} />
              <div className="block lg:hidden w-full md:mx-[30px]">
                <div className="flex mb-4 md:mb-[30px] items-center justify-between">
                  <div className="flex flex-col items-center w-[50%]">
                    <div className="rounded-full w-[64px] h-[64px] border border-text-1 flex items-center justify-center">
                      <span className="text-20">01</span>
                    </div>
                    <span className="mt-5">Get A Crypto Wallet</span>
                  </div>
                  <div className="flex flex-col items-center w-[50%]">
                    <div className="rounded-full w-[64px] h-[64px] border border-text-1 flex items-center justify-center">
                      <span className="text-20">02</span>
                    </div>
                    <span className="mt-5">Register As A Competent Node</span>
                  </div>
                </div>
                <div className="flex mb-4 md:mb-[30px] items-center justify-between">
                  <div className="flex flex-col items-center w-[50%]">
                    <div className="rounded-full w-[64px] h-[64px] border border-text-1 flex items-center justify-center">
                      <span className="text-20">03</span>
                    </div>
                    <span className="mt-5">Download The Software</span>
                  </div>
                  <div className="flex flex-col items-center w-[50%]">
                    <div className="rounded-full w-[64px] h-[64px] border border-text-1 flex items-center justify-center">
                      <span className="text-20">04</span>
                    </div>
                    <span className="mt-5">Serve To Earn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
