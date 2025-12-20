"use client";

import LogoIcon from "@/assets/logoicon";
import {
  CONSTANT,
  generate,
  getGrid,
  getSize,
  updateCubeClient,
  useAppearanceContext,
  useDispatchContext,
  useStateContext,
} from "@/lib/functions";
import { SessionContext } from "@/lib/providers";
import { TimeCubeDataType } from "@/lib/types";
import { motion } from "motion/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ViewportList } from "react-viewport-list";

const CubeGrid = ({ timeCube }: { timeCube: TimeCubeDataType }) => {
  const prevWidthRef = useRef(window.innerWidth);
  const dispatch = useDispatchContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const [finalGrid, setFinalGrid] = useState<React.ReactNode[]>([]);
  const [filledCubes, setFilledCubes] = useState(0);
  const { appearance } = useAppearanceContext();
  const outline = appearance.outline;
  const session = useContext(SessionContext);

  const generateCubeGrid = () => {
    const { totalCubes, filledCubes } = generate(
      timeCube,
      dispatch,
      setFilledCubes,
      session
    );
    updateCubeSize(totalCubes, filledCubes);
  };

  const updateCubeSize = (totalCubes: number, filledCubes: number) => {
    const { size: newSize, gap: newGap } = getSize(timeCube.totalCubes);

    getGrid(newSize, newGap, totalCubes, filledCubes, setFinalGrid, outline);
    // dispatch({
    //   type: "UPDATE",
    //   payload: { id: timeCube.id, cubeSize: newSize },
    // });
    updateCubeClient({ id: timeCube.id, cubeSize: newSize }, dispatch, session);
  };

  const handleResize = () => {
    const currentWidth = window.innerWidth;

    if (prevWidthRef.current !== currentWidth) {
      prevWidthRef.current = currentWidth;
      updateCubeSize(timeCube.totalCubes, filledCubes);
    }
  };

  useEffect(() => {
    generateCubeGrid();

    // if (!session) {
    //   // localStorage.setItem("cubeSettings", JSON.stringify(state));
    // }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    timeCube.cubeDuration,
    timeCube.totalCubes,
    timeCube.totalYears,
    timeCube.passedYears,
    timeCube.initialCustomDate,
    timeCube.endCustomDate,
    timeCube.format,
    outline,
  ]);

  useEffect(() => {
    const { size: newSize, gap: newGap } = getSize(timeCube.totalCubes);

    getGrid(
      newSize,
      newGap,
      timeCube.totalCubes,
      filledCubes,
      setFinalGrid,
      outline
    );

    const percentageFunction = () => {
      const now = new Date();

      const passedTime =
        now.getTime() - timeCube.initialDate.getTime() > 0
          ? now.getTime() - timeCube.initialDate.getTime()
          : 0;

      const newfilledCubes =
        Math.round((passedTime / (timeCube.cubeDuration * CONSTANT)) * 100) /
        100;
      setFilledCubes(newfilledCubes);
    };

    const cubeInterval = setInterval(() => {
      percentageFunction();
    }, Math.round((timeCube.cubeDuration / 200) * CONSTANT));

    if (filledCubes > timeCube.totalCubes) {
      clearInterval(cubeInterval);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(cubeInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [filledCubes, outline]);

  return (
    <>
      {timeCube.totalCubes === 0 ? (
        <div className="w-full flex flex-col flex-1 justify-center items-center bg-background-muted/40 border-foreground/80 border rounded-2xl text-[16px] px-5 sm:px-[60px] md:px-20 lg:px-[100px] text-text-color/80 gap-[30px]">
          <LogoIcon className="h-16 sm:h-18 md:h-20 lg:h-22 w-auto opacity-40" />
          <span className="text-center text-[14px] sm:text-[15px] md:text-[16px]">
            Please adjust settings to generate grid
          </span>
        </div>
      ) : (
        <motion.div
          key={`${finalGrid.length}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.5 }}
          ref={ref}
          className="scroll-container"
        >
          <ViewportList viewportRef={ref} items={finalGrid}>
            {(item, index) => <div key={index}>{item}</div>}
          </ViewportList>
        </motion.div>
      )}
    </>
  );
};

export default CubeGrid;
