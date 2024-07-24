/* eslint-env node */
/** @type {import('tailwindcss').Config} */

const pxToRem = (dest) => 1 / (16 / dest);

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontWeight: {
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
    },
    extend: {
      keyframes: {
        visible: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        show: "visible 1s linear forwards",
      },
      backgroundImage: {
        login: "url('/src/assets/bg_login.png')",
        // metamask: "url('/src/assets/metamask.png')",
        brandLinear:
          "linear-gradient(90deg, rgba(200,254,255,1) 0%, rgba(124,241,246,1) 50%, rgba(109,242,153,1) 100%)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        brand: {
          0: "#4df284",
          1: "#f0fff2",
          2: "#ccffd8",
        },
        border: {
          1: "#F5F5F5",
          2: "#E6E6E6",
          3: "#BFBFBF",
          4: "#191919",
        },
        fill: {
          1: "#ffffff",
          2: "#FAFAFA",
          3: "#F5F5F5",
          4: "#F0F0F0",
          5: "#191919",
        },
        text: {
          1: "#191919",
          2: "#666666",
          3: "#8C8C8C",
          4: "#BFBFBF",
          5: "#D9D9D9",
          6: "#FFFFFF",
        },
        success: {
          1: "#15d47b",
          2: "#3AE08D",
          3: "#09AD66",
          4: "#91FABE",
          5: "#E6FFEF",
        },
        warning: {
          1: "#FF9326",
          2: "#FFAD4F",
          3: "#D97116",
          4: "#FFD9A1",
          5: "#FFFAF0",
        },
        danger: {
          1: "#FF5B4C",
          2: "#FF8575",
          3: "#D93E36",
          4: "#FFD1C7",
          5: "#FFF4F0",
        },
        link: {
          1: "#406CFF",
          2: "#6991FF",
          3: "#2B4ED9",
          4: "#BAD1FF",
          5: "#F0F6FF",
        },
      },
      boxShadow: {
        default: "0px 0px 8px 0px rgba(0, 0, 0, 0.08)",
      },
      fontSize: {
        30: "30px",
        25: "25px",
        24: "25px",
        20: "20px",
        18: "18px",
        16: "16px",
        14: "14px",
        12: "12px",
      },
      inset: {
        center: "50%",
      },
      lineHeight: {
        20: "20px",
        22: "22px",
        24: "24px",
        28: "28px",
        32: "32px",
      },
      borderRadius: {
        "2sm": "8px",
        "3sm": "10px",
        "4sm": "12px",
        "5sm": "14px",
        "6sm": "16px",
      },
    },
    letterSpacing: {
      tighter: "-.007em",
      tight: "-.02em",
      normal: "0",
    },

    screens: {
      // mobile first -> (min-width:xxx)
      xs: `${pxToRem(320)}rem`,
      sm: `${pxToRem(576)}rem`,
      md: `${pxToRem(768)}rem`,
      lg: `${pxToRem(1024)}rem`,
      xl: `${pxToRem(1380)}rem`,
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
