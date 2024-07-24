import aboutCapell from "./aboutCapell.md?raw";
import whyCapell from "./whyCapell.md?raw";
import connectYourWallet from "./connectYourWallet.md?raw";
import deployYourService from "./deployYourService.md?raw";
import minimumCriteria from "./minimumCriteria.md?raw";
import faq from "./faq.md?raw";
import pointsSystem from "./pointsSystem.md?raw";

const DATA = [
  {
    title: "Introduction",
    path: "/intro",
    children: [
      {
        title: "About Capell",
        path: "/intro/aboutcapell",
        content: aboutCapell,
      },
      {
        title: "Why Capell",
        path: "/intro/whycapell",
        content: whyCapell,
      },
      {
        title: "Capell Roadmap",
        path: "/intro/capellroadmap",
      },
    ],
  },
  {
    title: "Get started",
    path: "/getstarted",
    children: [
      {
        title: "Deploy Your Service",
        path: "/getstarted/deploy",
        content: deployYourService,
      },
      {
        title: "Connect Your Wallet",
        path: "/getstarted/connect",
        content: connectYourWallet,
      },
      {
        title: "Minimum Criteria",
        path: "/getstarted/minimum",
        content: minimumCriteria,
      },
    ],
  },
  {
    title: "Profit",
    path: "/profit",
    children: [
      {
        title: "Points System",
        path: "/profit/points",
        content: pointsSystem,
      },
    ],
  },
  // {
  //   title: "FAQ",
  //   path: "/faq",
  //   content: faq,
  // },
];

export const LINKS = [
  {
    title: "Capell Chain",
    link: "http://47.236.112.17:3000/examplenet",
  },
  {
    title: "Github",
    link: "https://github.com/capell-io",
  },
];

export default DATA;
