"use client";

import { useScreenSaverContext } from "@/lib/functions";
import { TimeCubeDataType } from "@/lib/types";
import clsx from "clsx";
import { useState } from "react";
import { useEffect } from "react";

export type TimeLeftType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountDown = ({ timeCube }: { timeCube: TimeCubeDataType }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { screenSaver } = useScreenSaverContext();

  const initializeTime = () => {
    const now = new Date();
    const difference = timeCube.endDate.getTime() - now.getTime();

    if (difference <= 0) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    setTimeLeft({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  };

  useEffect(() => {
    initializeTime();

    const interval = setInterval(() => {
      const now = new Date();
      const difference = timeCube.endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeCube.endDate]);

  return (
    <div
      className={clsx(
        "flex w-full justify-evenly sm:justify-center  text-text-color",
        screenSaver ? "sm:gap-10" : "sm:gap-[30px]"
      )}
    >
      <div className="flex flex-col gap-0 items-center">
        <span
          className={clsx(
            "transition-all",
            screenSaver
              ? "text-[32px] sm:text-[40px] lg:text-[56px] xl:text-[72px] 2xl:text-[88px]"
              : "text-[24px]"
          )}
        >
          {timeLeft.days}
        </span>
        <span className="text-text-color/50 text-[14px]">days</span>
      </div>
      <div className="flex flex-col gap-0 items-center">
        <span
          className={clsx(
            "transition-all",
            screenSaver
              ? "text-[32px] sm:text-[40px] lg:text-[56px] xl:text-[72px] 2xl:text-[88px]"
              : "text-[24px]"
          )}
        >
          {timeLeft.hours}
        </span>
        <span className="text-text-color/50 text-[14px]">hours</span>
      </div>
      <div className="flex flex-col gap-0 items-center">
        <span
          className={clsx(
            "transition-all",
            screenSaver
              ? "text-[32px] sm:text-[40px] lg:text-[56px] xl:text-[72px] 2xl:text-[88px]"
              : "text-[24px]"
          )}
        >
          {timeLeft.minutes}
        </span>
        <span className="text-text-color/50 text-[14px]">minutes</span>
      </div>
      <div className="flex flex-col gap-0 items-center">
        <span
          className={clsx(
            "transition-all",
            screenSaver
              ? "text-[32px] sm:text-[40px] lg:text-[56px] xl:text-[72px] 2xl:text-[88px]"
              : "text-[24px]"
          )}
        >
          {timeLeft.seconds}
        </span>
        <span className="text-text-color/50 text-[14px]">seconds</span>
      </div>
    </div>
  );
};

export default CountDown;
