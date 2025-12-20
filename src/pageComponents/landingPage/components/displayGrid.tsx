"use client";

import { motion } from "motion/react";

export const DisplayGrid = () => {
  const totalCubes = 126;

  const cubes = Array.from({ length: totalCubes });

  return (
    <div>
      <div
        className={`grid grid-cols-18 gap-[5px] xs:gap-1.5 sm:gap-[6.5px] md:gap-[7px] lg:gap-2 justify-center w-full max-w-[800px] mx-auto relative`}
      >
        <div className="w-full h-full absolute bg-linear-to-t from-5% from-background-static to-background-static/0 z-10"></div>
        {cubes.map((_, i) => {
          const isColored = i < totalCubes / 2;
          const delay = i * 0.01;

          return (
            <div
              key={i}
              className={`aspect-square rounded-[3px] xs:rounded-[5px] sm:rounded-[5px] md:rounded-md lg:rounded-[7px] bg-foreground-static/60 relative overflow-hidden`}
            >
              {isColored && (
                <motion.div
                  animate={{ width: `100%` }}
                  transition={{
                    delay: delay,
                    duration: 0.1,
                    ease: "linear",
                  }}
                  className="h-full absolute top-0 left-0 w-0 bg-foreground-muted-static"
                ></motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
