import { useEffect } from "react";

// 点击某dom外区域时事件处理

const useClickOutside = (callback, selectors: string[]) => {
  const handleClickOutside = (event) => {
    const list = selectors.map((queryStr) => document.querySelector(queryStr));
    console.log("list", list);
    if (list.some((i) => !i)) {
      return;
    }
    if (list.some((ele) => ele.contains(event.target))) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    callback();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};

export { useClickOutside };
