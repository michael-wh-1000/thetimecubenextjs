"use client";

import {
  AppearanceContext,
  DispatchContext,
  ScreenSaverContext,
  StateContext,
} from "@/lib/providers";
import { TimeLeftType } from "@/components/nonreusable/countdown";
import { motion } from "motion/react";
import { useContext } from "react";
import {
  Action,
  durationOptions,
  SessionType,
  staticState,
  TimeCubeDataType,
} from "./types";
import { updateCube } from "./server";

export const useAppearanceContext = () => {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error(
      "useAppearanceContext must be used within a ContextProvider"
    );
  }
  return context;
};

export const useScreenSaverContext = () => {
  const context = useContext(ScreenSaverContext);
  if (!context) {
    throw new Error(
      "useScreenSaverContext must be used within a context provider"
    );
  }
  return context;
};

export const useStateContext = (): staticState => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "usetimeCubeItemContext must be used within a ContextProvider"
    );
  }
  return context;
};

export const useDispatchContext = (): React.Dispatch<Action> => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error("useDispatchContext must be used within a ContextProvider");
  }
  return context;
};

export const CONSTANT = 24 * 60 * 60 * 1000;
const MAX_SIZE = 10000;
const MIN_SIZE = 1;

export const getLabel = (duration: number) => {
  const durationOption = durationOptions.find(
    (durationOption) => durationOption.value === duration
  );

  return durationOption?.label;
};

export const generate = (
  timeCubeItem: TimeCubeDataType,
  dispatch: React.Dispatch<Action>,
  setFilledCubes: React.Dispatch<React.SetStateAction<number>>,
  session: SessionType
) => {
  if (timeCubeItem.format === "life") {
    const now = new Date();

    const initialDate = timeCubeItem.birthDate;
    const endDate = timeCubeItem.deathDate;

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime = endDate.getTime() - initialDate.getTime();

    const cubeDuration = adjustDuration(
      timeCubeItem,
      dispatch,
      totalTime,
      session
    );

    const finalCheckResult = finalCheck(
      timeCubeItem.id,
      dispatch,
      totalTime,
      cubeDuration,
      endDate,
      initialDate,
      setFilledCubes,
      session
    );

    if (finalCheckResult) {
      const totalCubes = 0;
      const filledCubes = 0;

      return { totalCubes, filledCubes };
    }

    const totalCubes = Math.round(totalTime / (cubeDuration * CONSTANT));
    const filledCubes =
      Math.round((passedTime / (cubeDuration * CONSTANT)) * 100) / 100;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        endDate: endDate,
        initialDate: initialDate,
        totalCubes: totalCubes,
      },
      dispatch,
      session
    );

    setFilledCubes(filledCubes);

    return { totalCubes, filledCubes };
  } else if (timeCubeItem.format === "year") {
    const now = new Date();

    const initialDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime = endDate.getTime() - initialDate.getTime();

    const cubeDuration = adjustDuration(
      timeCubeItem,
      dispatch,
      totalTime,
      session
    );

    const finalCheckResult = finalCheck(
      timeCubeItem.id,
      dispatch,
      totalTime,
      cubeDuration,
      endDate,
      initialDate,
      setFilledCubes,
      session
    );

    if (finalCheckResult) {
      const totalCubes = 0;
      const filledCubes = 0;

      return { totalCubes, filledCubes };
    }

    const totalCubes = Math.round(totalTime / (cubeDuration * CONSTANT));
    const filledCubes =
      Math.round((passedTime / (cubeDuration * CONSTANT)) * 100) / 100;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        endDate: endDate,
        initialDate: initialDate,
        totalCubes: totalCubes,
      },
      dispatch,
      session
    );

    setFilledCubes(filledCubes);

    return { totalCubes, filledCubes };
  } else if (timeCubeItem.format === "custom") {
    const now = new Date();

    const initialDate = timeCubeItem.initialCustomDate;
    const endDate = timeCubeItem.endCustomDate;

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime = endDate.getTime() - initialDate.getTime();

    const cubeDuration = adjustDuration(
      timeCubeItem,
      dispatch,
      totalTime,
      session
    );

    const finalCheckResult = finalCheck(
      timeCubeItem.id,
      dispatch,
      totalTime,
      cubeDuration,
      endDate,
      initialDate,
      setFilledCubes,
      session
    );

    if (finalCheckResult) {
      const totalCubes = 0;
      const filledCubes = 0;

      return { totalCubes, filledCubes };
    }

    const totalCubes = Math.round(totalTime / (cubeDuration * CONSTANT));
    const filledCubes =
      Math.round((passedTime / (cubeDuration * CONSTANT)) * 100) / 100;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        endDate: endDate,
        initialDate: initialDate,
        totalCubes: totalCubes,
      },
      dispatch,
      session
    );
    setFilledCubes(filledCubes);

    return { totalCubes, filledCubes };
  } else if (timeCubeItem.format === "month") {
    const now = new Date();

    const initialDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime = endDate.getTime() - initialDate.getTime();

    const cubeDuration = adjustDuration(
      timeCubeItem,
      dispatch,
      totalTime,
      session
    );

    const finalCheckResult = finalCheck(
      timeCubeItem.id,
      dispatch,
      totalTime,
      cubeDuration,
      endDate,
      initialDate,
      setFilledCubes,
      session
    );

    if (finalCheckResult) {
      const totalCubes = 0;
      const filledCubes = 0;

      return { totalCubes, filledCubes };
    }

    const totalCubes = Math.round(totalTime / (cubeDuration * CONSTANT));
    const filledCubes =
      Math.round((passedTime / (cubeDuration * CONSTANT)) * 100) / 100;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        endDate: endDate,
        initialDate: initialDate,
        totalCubes: totalCubes,
      },
      dispatch,
      session
    );
    setFilledCubes(filledCubes);

    return { totalCubes, filledCubes };
  } else if (timeCubeItem.format === "week") {
    const now = new Date();
    const currentDay = now.getDay();

    const initialDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    initialDate.setDate(now.getDate() - currentDay);
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
    endDate.setDate(now.getDate() + (6 - currentDay));

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime = endDate.getTime() - initialDate.getTime();

    const cubeDuration = adjustDuration(
      timeCubeItem,
      dispatch,
      totalTime,
      session
    );

    const finalCheckResult = finalCheck(
      timeCubeItem.id,
      dispatch,
      totalTime,
      cubeDuration,
      endDate,
      initialDate,
      setFilledCubes,
      session
    );

    if (finalCheckResult) {
      const totalCubes = 0;
      const filledCubes = 0;

      return { totalCubes, filledCubes };
    }

    const totalCubes = Math.round(totalTime / (cubeDuration * CONSTANT));
    const filledCubes =
      Math.round((passedTime / (cubeDuration * CONSTANT)) * 100) / 100;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        endDate: endDate,
        initialDate: initialDate,
        totalCubes: totalCubes,
      },
      dispatch,
      session
    );
    setFilledCubes(filledCubes);

    return { totalCubes, filledCubes };
  } else if (timeCubeItem.format === "day") {
    const now = new Date();

    const initialDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );

    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime = endDate.getTime() - initialDate.getTime();

    const cubeDuration = adjustDuration(
      timeCubeItem,
      dispatch,
      totalTime,
      session
    );

    const finalCheckResult = finalCheck(
      timeCubeItem.id,
      dispatch,
      totalTime,
      cubeDuration,
      endDate,
      initialDate,
      setFilledCubes,
      session
    );

    if (finalCheckResult) {
      const totalCubes = 0;
      const filledCubes = 0;

      return { totalCubes, filledCubes };
    }

    const totalCubes = Math.round(totalTime / (cubeDuration * CONSTANT));
    const filledCubes =
      Math.round((passedTime / (cubeDuration * CONSTANT)) * 100) / 100;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        endDate: endDate,
        initialDate: initialDate,
        totalCubes: totalCubes,
      },
      dispatch,
      session
    );
    setFilledCubes(filledCubes);

    return { totalCubes, filledCubes };
  } else {
    const totalCubes = 0;
    const filledCubes = 0;

    return { totalCubes, filledCubes };
  }
};

export const getPercentage = (timeCubeItem: TimeCubeDataType) => {
  if (timeCubeItem.format === "life") {
    const now = new Date();

    const initialDate = new Date(now);
    initialDate.setFullYear(now.getFullYear() - timeCubeItem.passedYears);
    const endDate = new Date(initialDate);
    endDate.setFullYear(initialDate.getFullYear() + timeCubeItem.totalYears);

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;

    const totalTime =
      endDate.getTime() - initialDate.getTime() > 0
        ? endDate.getTime() - initialDate.getTime()
        : 0;

    const possiblePercentage = Math.round((passedTime / totalTime) * 100) || 0;
    const finalPercentage = possiblePercentage > 100 ? 100 : possiblePercentage;

    return finalPercentage;
  } else if (timeCubeItem.format === "year") {
    const now = new Date();

    const initialDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime =
      endDate.getTime() - initialDate.getTime() > 0
        ? endDate.getTime() - initialDate.getTime()
        : 0;

    const possiblePercentage = Math.round((passedTime / totalTime) * 100) || 0;
    const finalPercentage = possiblePercentage > 100 ? 100 : possiblePercentage;

    return finalPercentage;
  } else if (timeCubeItem.format === "custom") {
    const now = new Date();

    const initialDate = timeCubeItem.initialCustomDate;
    const endDate = timeCubeItem.endCustomDate;

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime =
      endDate.getTime() - initialDate.getTime() > 0
        ? endDate.getTime() - initialDate.getTime()
        : 0;

    const possiblePercentage = Math.round((passedTime / totalTime) * 100) || 0;
    const finalPercentage = possiblePercentage > 100 ? 100 : possiblePercentage;

    return finalPercentage;
  } else if (timeCubeItem.format === "month") {
    const now = new Date();

    const initialDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime =
      endDate.getTime() - initialDate.getTime() > 0
        ? endDate.getTime() - initialDate.getTime()
        : 0;

    const possiblePercentage = Math.round((passedTime / totalTime) * 100) || 0;
    const finalPercentage = possiblePercentage > 100 ? 100 : possiblePercentage;

    return finalPercentage;
  } else if (timeCubeItem.format === "week") {
    const now = new Date();
    const currentDay = now.getDay();

    const initialDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    initialDate.setDate(now.getDate() - currentDay);
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
    endDate.setDate(now.getDate() + (6 - currentDay));

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime =
      endDate.getTime() - initialDate.getTime() > 0
        ? endDate.getTime() - initialDate.getTime()
        : 0;

    const possiblePercentage = Math.round((passedTime / totalTime) * 100) || 0;
    const finalPercentage = possiblePercentage > 100 ? 100 : possiblePercentage;

    return finalPercentage;
  } else if (timeCubeItem.format === "day") {
    const now = new Date();

    const initialDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const passedTime =
      now.getTime() - initialDate.getTime() > 0
        ? now.getTime() - initialDate.getTime()
        : 0;
    const totalTime =
      endDate.getTime() - initialDate.getTime() > 0
        ? endDate.getTime() - initialDate.getTime()
        : 0;

    const possiblePercentage = Math.round((passedTime / totalTime) * 100) || 0;
    const finalPercentage = possiblePercentage > 100 ? 100 : possiblePercentage;

    return finalPercentage;
  } else {
    return 0;
  }
};

export const getSize = (cubeNumber: number) => {
  const width = window.innerWidth;
  const sqrt = Math.round(Math.sqrt(cubeNumber) * 2);

  const maxSize = Math.round(((80 / 100) * width) / sqrt);

  const minSize = 10;
  const realMaxSize = 50;
  const size = Math.min(Math.max(maxSize, minSize), realMaxSize);
  const gap = Math.round(size / 4);

  return { size, gap };
};

export const getGrid = (
  gridCubeSize: number,
  gridGap: number,
  cubeNumber: number,
  coloredCubes: number,
  setFinalGrid: React.Dispatch<React.SetStateAction<React.ReactNode[]>>,
  outline: boolean
) => {
  const width = window.innerWidth;
  const gridWidth =
    width > 1280
      ? width * 0.75
      : width > 1024
      ? width * 0.8
      : width > 768
      ? width * 0.85
      : width * 0.9;
  const grid = [];
  const row: React.ReactNode[] = [];

  for (let i = 1; i <= cubeNumber; i++) {
    if (row.length === Math.round(gridWidth / (gridCubeSize + gridGap))) {
      const newRow = (
        <div
          style={{ gap: gridGap, paddingBottom: gridGap }}
          className="flex"
          key={i}
        >
          {row.map((square) => square)}
        </div>
      );
      grid.push(newRow);
      row.splice(0, row.length);
    }
    const percentage =
      i === Math.ceil(coloredCubes) &&
      Math.round((coloredCubes - (i - 1)) * 100);

    const square = (
      <div
        key={i}
        style={{
          width: gridCubeSize,
          height: gridCubeSize,
          borderRadius: gridGap / 1.5,
          // background:
          //   i === Math.ceil(coloredCubes)
          //     ? `linear-gradient(to right, ${foregroundMuted} ${percentage}%, ${foreground} ${percentage}%)`
          //     : "",
        }}
        className={`opacity-100 span relative overflow-hidden ${
          i <= coloredCubes ? "bg-foreground-muted" : "bg-foreground/60"
        } ${outline && "border-[0.5px] border-foreground-muted"}`}
      >
        {i === Math.ceil(coloredCubes) && (
          <motion.div
            animate={{ width: `${percentage}%` }}
            // style={{
            //   borderRadius: `${gridGap / 1.5}px 0 0 ${gridGap / 1.5}px`,
            // }}
            className="h-full absolute top-0 left-0 w-full bg-foreground-muted"
          ></motion.div>
        )}
      </div>
    );

    row.push(square);

    if (i === cubeNumber) {
      const newRow = (
        <div
          style={{ gap: gridGap, paddingBottom: gridGap }}
          className="flex"
          key={i}
        >
          {row.map((square) => square)}
        </div>
      );
      grid.push(newRow);
      row.splice(0, row.length);
    }
  }

  setFinalGrid(grid);
};

export const getTime = (
  end: Date,
  setTimeLeft: React.Dispatch<React.SetStateAction<TimeLeftType>>
) => {
  const interval = setInterval(() => {
    const now = new Date();
    const difference = end.getTime() - now.getTime();

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

  return () => clearInterval(interval);
};

const adjustDuration = (
  timeCubeItem: TimeCubeDataType,
  dispatch: React.Dispatch<Action>,
  totalTime: number,
  session: SessionType
) => {
  if (totalTime === 0) return 7;

  let tempDuration = timeCubeItem.cubeDuration;

  if (Math.round(totalTime / (tempDuration * CONSTANT)) > MAX_SIZE) {
    const newDurationOption = durationOptions.find(
      (durationOption) =>
        totalTime / (durationOption.value * CONSTANT) <= MAX_SIZE
    );

    tempDuration = newDurationOption
      ? newDurationOption.value
      : durationOptions[0].value;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        cubeDuration: newDurationOption
          ? newDurationOption.value
          : durationOptions[0].value,
      },
      dispatch,
      session
    );
  }

  if (Math.round(totalTime / (tempDuration * CONSTANT)) < MIN_SIZE) {
    const newDurationOption = durationOptions.find(
      (durationOption) =>
        totalTime / (durationOption.value * CONSTANT) >= MIN_SIZE
    );

    tempDuration = newDurationOption
      ? newDurationOption.value
      : durationOptions[0].value;

    updateCubeClient(
      {
        id: timeCubeItem.id,
        cubeDuration: newDurationOption
          ? newDurationOption.value
          : durationOptions[0].value,
      },
      dispatch,
      session
    );
  }

  return tempDuration;
};

const finalCheck = (
  id: string,
  dispatch: React.Dispatch<Action>,
  totalTime: number,
  cubeDuration: number,
  endDate: Date,
  initialDate: Date,
  setFilledCubes: React.Dispatch<React.SetStateAction<number>>,
  session: SessionType
) => {
  if (
    Math.round(totalTime / (cubeDuration * CONSTANT)) > MAX_SIZE ||
    Math.round(totalTime / (cubeDuration * CONSTANT)) < MIN_SIZE
  ) {
    updateCubeClient(
      {
        id: id,
        endDate: endDate,
        initialDate: initialDate,
        totalCubes: 0,
      },
      dispatch,
      session
    );
    setFilledCubes(0);

    return true;
  }

  return false;
};

export const isOptionDisabled = (
  timeCubeItem: TimeCubeDataType,
  value: number
) => {
  if (timeCubeItem.totalCubes <= 0) {
    return false;
  }
  const totalTime =
    timeCubeItem.totalCubes * timeCubeItem.cubeDuration * CONSTANT;
  const cubeNumber = totalTime / (value * CONSTANT);
  return cubeNumber < MIN_SIZE || cubeNumber > MAX_SIZE;
};

export function updateCubeClient(
  payload: { id: string } & Partial<Omit<TimeCubeDataType, "id">>,
  dispatch: React.Dispatch<Action>,
  session: SessionType
) {
  if (session) {
    const serverPayload = Object.fromEntries(
      Object.entries(payload).filter(([key]) =>
        [
          "id",
          "name",
          "format",
          "cubeDuration",
          "passedYears",
          "totalYears",
          "initialCustomDate",
          "endCustomDate",
          "userId",
        ].includes(key)
      )
    );

    if (Object.keys(serverPayload).length > 1) {
      void (async () => {
        const result = await updateCube(payload);

        if (result?.error) {
          console.error(result.error);
        }
      })();
    }
    dispatch({
      type: "UPDATE",
      payload: payload,
    });
  } else {
    dispatch({
      type: "UPDATE",
      payload: payload,
    });
  }
}
