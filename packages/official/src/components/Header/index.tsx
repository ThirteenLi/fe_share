import imgLogo from "/public/logo.png";
import { useBoolean } from "ahooks";
import cls from "classnames";
import { useLayoutEffect, useRef } from "react";

function Header() {
  const refStaticNav = useRef<HTMLDivElement>();
  const [dynamicNavVisible, { setTrue: setDynamicNavVisibleTrue, setFalse: setDynamicNavVisibleFalse }] =
    useBoolean(false);

  const isInViewport = () => {
    if (refStaticNav.current) {
      const rect = refStaticNav.current.getBoundingClientRect();
      return rect.top + rect.height >= 0;
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", () => {
      if (!isInViewport()) {
        setDynamicNavVisibleTrue();
      } else {
        setDynamicNavVisibleFalse();
      }
    });
  }, []);

  return (
    <>
      <div
        className="flex items-center w-full lg:h-[80px] h-[44px] lg:px-[60px] px-[16px] relative z-50"
        ref={refStaticNav}
      >
        <img src={imgLogo} className="lg:h-[36px] h-[20px]" alt="" />
        <div className="ml-auto flex items-center lg:gap-[48px] gap-8 lg:text-16 text-14 lg:leading-7 leading-[18px]">
          <p
            className="cursor-pointer hover:opacity-50"
            onClick={() => {
              scrollTo(0, 0);
            }}
          >
            Home
          </p>
          <p
            className="cursor-pointer hover:opacity-50"
            onClick={() => {
              window.open("https://docs.capell.io/");
            }}
          >
            Docs
          </p>
        </div>
      </div>
      {
        <div
          className={cls(
            dynamicNavVisible ? "flex" : "hidden",
            "xl:mx-auto max-w-[1440px] items-center fixed z-50 top-[14px] xl:left-0 xl:right-0 lg:left-[60px] left-0 right-0 lg:right-[60px] border rounded-[10px] border-stroke lg:pl-8 pl-4 pr-[5px] lg:h-[64px] h-[46px] bg-nav backdrop-blur-[20px]",
          )}
        >
          <img src={imgLogo} className="lg:h-[36px] h-[20px]" alt="" />
          <div className="ml-auto flex items-center lg:gap-[56px] gap-4 text-16 font-500">
            <p
              className="cursor-pointer hover:opacity-50"
              onClick={() => {
                scrollTo(0, 0);
              }}
            >
              Home
            </p>
            <p
              className="cursor-pointer hover:opacity-50"
              onClick={() => {
                window.open("https://docs.capell.io/");
              }}
            >
              Docs
            </p>
            <div
              className="lg:h-[54px] h-[36px] lg:rounded-[10px] rounded-[6px] bg-brand-0 font-400 lg:text-18 text-12 text-text-1 lg:px-8 px-3 flex items-center cursor-pointer hover:bg-success-3"
              onClick={() => {
                window.open("https://node.capell.io/");
              }}
            >
              Get Started
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Header;
