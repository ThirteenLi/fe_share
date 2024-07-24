import copy from "copy-to-clipboard";
import { Message } from "~/components";

export const copyText = (str: string, callback?: () => void) => {
  copy(str);
  if (callback) {
    callback();
  } else {
    Message({ content: "Copied successfully.", type: "success" });
  }
};

let timer;
export const debounce = (func, timeout = 500) => {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
