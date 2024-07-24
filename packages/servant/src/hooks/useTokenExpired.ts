import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Message } from "~/components";

let timerId = null;

export const useTokenExpired = () => {
  const navigate = useNavigate();
  const stopCheck = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  const checkExpired = () => {
    const localExpired = Number(localStorage.getItem("expired")) || 0;
    const now = dayjs().unix();
    return localExpired - now <= 0;
  };

  const startCheck = () => {
    stopCheck();

    const newTimerId = setInterval(() => {
      if (checkExpired()) {
        stopCheck();
        Message({
          content: "Token is expired, please login in",
          duration: 1500,
          onClose: () => {
            navigate("/");
          },
        });
      }
    }, 10000);
    timerId = newTimerId;
  };

  return { timerId, startCheck, stopCheck, checkExpired };
};
