import { useState, useEffect } from "react";

const useCountdownTimer = () => {
  const initialTime = {
    hours: 1,
    minutes: 30,
    seconds: 0,
  };
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = {
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      };

      if (newTime.seconds < 0) {
        if (newTime.minutes > 0) {
          newTime.minutes -= 1;
          newTime.seconds = 59;
        } else if (newTime.hours > 0) {
          newTime.hours -= 1;
          newTime.minutes = 59;
          newTime.seconds = 59;
        } else {
          clearInterval(timer);
          console.log("Countdown reached zero!");
        }
      }

      setTime(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return {
    hour: time.hours,
    minute: time.minutes,
    second: time.seconds,
  };
};

export default useCountdownTimer;
