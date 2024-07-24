import cls from "classnames";
import { useState } from "react";
import imgLogo from "/public/logo.png";
import { ReactComponent as SvgArrowDown } from "/public/ic_arrowdrown.svg";
import { ReactComponent as SvgCat } from "/public/footer/icon-cat.svg";
import { ReactComponent as SvgDiscord } from "/public/footer/icon-discord.svg";
import { ReactComponent as SvgFile } from "/public/footer/icon-file.svg";
import { ReactComponent as SvgPlane } from "/public/footer/icon-plane.svg";
import { ReactComponent as SvgTwitter } from "/public/footer/icon-twitter.svg";
import s from "./index.module.less";

export default function Footer() {
  const [openKey, setOpenKey] = useState(1);
  const list = [
    {
      key: 1,
      title: "Why Use The Keplr Wallet Instead Of Metamask?",
      content: (
        <span>
          Keplr Is Chosen Over MetaMask For Capell Because It's Specifically Designed For The Cosmos Ecosystem, Ensuring
          A Smoother And More Secure Experience On Capell's Cosmos-Based Platform.{" "}
          <span className="text-success-1">Learn More.</span>
        </span>
      ),
    },
    {
      key: 2,
      title: "Why Do I Need WUSD in My Wallet?",
      content: (
        <span>
          Keplr Is Chosen Over MetaMask For Capell Because It's Specifically Designed For The Cosmos Ecosystem, Ensuring
          A Smoother And More Secure Experience On Capell's Cosmos-Based Platform.{" "}
          <span className="text-success-1">Learn More.</span>
        </span>
      ),
    },
    {
      key: 3,
      title: "Here Is The Second Question?",
      content: (
        <span>
          Keplr Is Chosen Over MetaMask For Capell Because It's Specifically Designed For The Cosmos Ecosystem, Ensuring
          A Smoother And More Secure Experience On Capell's Cosmos-Based Platform.{" "}
          <span className="text-success-1">Learn More.</span>
        </span>
      ),
    },
    {
      key: 4,
      title: "Why Do I Need WUSD in My Wallet?",
      content: (
        <span>
          Keplr Is Chosen Over MetaMask For Capell Because It's Specifically Designed For The Cosmos Ecosystem, Ensuring
          A Smoother And More Secure Experience On Capell's Cosmos-Based Platform.{" "}
          <span className="text-success-1">Learn More.</span>
        </span>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex lg:pt-[100px] md:pt-[30px] pt-[25px] lg:pb-[124px] lg:px-[60px] md:px-[30px] px-0 justify-between flex-col lg:flex-row">
        <div className="md:px-0 px-4">
          <p className="font-500 lg:text-[60px] lg:leading-[72px] text-[30px] leading-[33px] text-fill-1 whitespace-nowrap wow animate__animated animate__fadeIn">
            Frequently Asked
          </p>
          <p
            className={cls(
              "font-500 lg:text-[60px] lg:leading-[72px] text-[30px] leading-[33px] w-fit bg-brandLinear mb-4 wow animate__animated animate__fadeIn",
              s.textLinear,
            )}
          >
            Questions
          </p>
          <p className="opacity-50 text-fill-1 font-300 lg:text-18 text-[16px] lg:leading-[27px] leading-[24px]">
            Explanation of frequently asked questions by users.
          </p>
        </div>
        <div className="mt-5 lg:mt-0 xl:max-w-[536px] lg:max-w-[437px]">
          {list.map(({ key, title, content }) => {
            const isOpen = openKey === key;
            return (
              <div className="" key={key}>
                <div
                  className="flex items-center p-4 cursor-pointer"
                  onClick={() => {
                    setOpenKey((prev) => (key === prev ? undefined : key));
                  }}
                >
                  <div className="font-400 text-fill-1 text-18 leading-[32px]">{title}</div>
                  <SvgArrowDown className={cls("shrink-0 ml-auto transition-transform", isOpen && "rotate-180")} />
                </div>
                <div
                  className={cls(
                    "overflow-hidden font-300 text-14 leading-[24px] transition-[max-height] px-8 duration-300 delay-0",
                    isOpen ? "max-h-[500px]" : "max-h-0 border-b border-border-5",
                  )}
                >
                  <div className="py-2">{content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full lg:h-[1px] h-0 bg-fill-1 opacity-20"></div>
      <div className="lg:p-[60px] pt-[40px] px-4 pb-6">
        <div className="flex items-center mb-[30px]">
          <img className="h-[20px] lg:h-[36px]" src={imgLogo} alt="" />
          <div className="lg:ml-[80px] ml-auto lg:mr-auto flex items-center gap-[48px] text-16 leading-7">
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
                window.open("https://docs.capell.io");
              }}
            >
              Docs
            </p>
            {/* <p className="cursor-pointers hover:opacity-50">Chain</p> */}
          </div>
          <div className="items-center gap-6 lg:flex hidden">
            {/* <SvgDiscord /> */}
            <SvgPlane
              className="cursor-pointer"
              onClick={() => {
                window.open("https://t.me/Capell_global");
              }}
            />
            <SvgTwitter
              className="cursor-pointer"
              onClick={() => {
                window.open("https://twitter.com/Capell_global");
              }}
            />
            <SvgCat
              className="cursor-pointer"
              onClick={() => {
                window.open("https://github.com/capell-io");
              }}
            />
            <SvgFile
              className="cursor-pointer"
              onClick={() => {
                window.open("https://docs.capell.io");
              }}
            />
          </div>
        </div>
        <div className="lg:mb-[40px] font-300 text-12 leading-[18px] text-text-4 max-w-[664px]">
          Dive into discussions, connect with like-minded users, and explore our product together. Shareinsights, spark
          conversations, and be part of a vibrant exchange of ideas. Your input matters.so let's collaborate and create
          an engaging space where your voice is heard. Don't miss thechance to join us today!
        </div>
        <div className="flex items-center md:gap-[38px] gap-4 lg:hidden block my-[20px]">
          {/* <SvgDiscord /> */}
          <SvgPlane
            className="cursor-pointer"
            onClick={() => {
              window.open("https://t.me/Capell_global");
            }}
          />
          <SvgTwitter
            className="cursor-pointer"
            onClick={() => {
              window.open("https://twitter.com/Capell_global");
            }}
          />
          <SvgCat
            className="cursor-pointer"
            onClick={() => {
              window.open("https://github.com/capell-io");
            }}
          />
          <SvgFile
            className="cursor-pointer"
            onClick={() => {
              window.open("https://docs.capell.io");
            }}
          />
        </div>
        <p className="font-300 text-14 leading-[24px] text-text-4">Capell © 2023. All Rights Reserved.</p>
      </div>
    </div>
  );
}

// Discord:
// 先下掉这个入口

// Telegram:
// https://t.me/Capell_global

// Twitter:
// https://twitter.com/Capell_global

// Github：
// https://github.com/capell-io

// Docs:
// https://docs.capell.io/
