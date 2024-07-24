import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Message } from "@arco-design/web-react";

let timerId = null;

const useTokenExpired = () => {
  const navigate = useNavigate();
  const stopCheck = () => {
    console.log("stop timerId", timerId);
    clearTimeout(timerId);
    timerId = null;
  };

  const startCheck = () => {
    stopCheck();

    const newTimerId = setInterval(() => {
      const localExpired = Number(localStorage.getItem("expired")) || 0;
      const now = dayjs().unix();
      console.log("localExpired", localExpired, localExpired - now);
      if (localExpired && localExpired - now <= 300) {
        Message.info("Token is expired, please login in");
        stopCheck();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }, 10000);
    console.log("start timerid", newTimerId);
    timerId = newTimerId;
  };

  return { timerId, startCheck, stopCheck };
};

export default useTokenExpired;
