import { useState, useEffect } from "react";

export const useCountdown = (initialTime: number, callback: () => void, start = true) => {
  const [time, setTime] = useState(initialTime);

  const restart = () => {
    setTime(initialTime);
  };

  useEffect(() => {
    if (start && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      callback(); // 执行回调函数
    }
  }, [start, time, callback]);

  return { time, restart };
};
