"use client";

import CountDown from "@/components/nonreusable/countdown";
import CubeGrid from "@/components/nonreusable/grid";
import { GuideSpringModal } from "@/components/nonreusable/guideModal";
import Options from "@/components/nonreusable/options";
import {
  useAppearanceContext,
  useScreenSaverContext,
  useStateContext,
} from "@/lib/functions";
import { SessionContext } from "@/lib/providers";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useContext, useMemo } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { CustomButton } from "@/components/reusable/customButton";
import { IoChevronBackOutline } from "react-icons/io5";
import { TbRotate } from "react-icons/tb";
import { updateAppearance } from "@/lib/server";
import { durationOptions, getClosestDuration } from "@/lib/types";
import Loading from "@/components/reusable/loading";

function CubePage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const { screenSaver } = useScreenSaverContext();
  const { appearance, appearanceDispatch } = useAppearanceContext();
  const session = useContext(SessionContext);
  const state = useStateContext();
  const timeCube = state.find((item) => item.id == id);

  useEffect(() => {
    if (!timeCube) {
      router.push("/app");
    }
  }, [timeCube]);

  const driverObj2 = useMemo(
    () =>
      driver({
        popoverClass: "driverjs-theme",
        showProgress: false,
        steps: [
          {
            element: ".settingsDriver",
            popover: {
              title: "Settings",
              description:
                "These are the settings for your timer. You can change the format of what is being timed and even choose custom durations to track",
            },
          },
          {
            element: ".countdownDriver",
            popover: {
              title: "Countdown",
              description:
                "This is a countdown of your time left. It counts down to zero",
            },
          },
          {
            element: ".gridDriver",
            popover: {
              title: "Grid",
              description:
                "This is a grid with cubes that fill up as your time left decreases. You can change the duration each cube represents in the settings",
            },
          },
          {
            element: ".focusDriver",
            popover: {
              title: "Focus Mode",
              description:
                "This hides all settings and controls for a minimal appearance",
            },
          },
          {
            element: ".replayDriver",
            popover: {
              title: "Tutorial Replay",
              description:
                "Click this button to replay the tutorial if you need to",
            },
          },
        ],
      }),
    []
  );

  const updateCubeTutorial = async () => {
    if (session) {
      try {
        const result = await updateAppearance({ cubeTutorial: true });

        appearanceDispatch({
          type: "UPDATE",
          payload: { cubeTutorial: true },
        });
      } catch (error) {
        console.error("Error updating database");
      }
    } else {
      appearanceDispatch({
        type: "UPDATE",
        payload: { cubeTutorial: true },
      });
    }
  };

  useEffect(() => {
    const cubeTutorial = localStorage.getItem("cubeTutorial");

    if (!(appearance.cubeTutorial || cubeTutorial)) {
      driverObj2.drive();
      updateCubeTutorial();
      localStorage.setItem("dashboardTutorial", "true");
    }
    if (cubeTutorial && !appearance.cubeTutorial) {
      updateCubeTutorial();
    }
  }, []);

  useEffect(() => {
    return () => {
      driverObj2.destroy();
    };
  }, [driverObj2]);

  if (!timeCube) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center bg-background pt-[85px] sm:pt-[105px] pb-5 mb-5 sm:pb-10 sm:mb-10  px-5 sm:px-[60px] max-w-[2000px] min-h-screen">
        <div className="w-full flex flex-col gap-5 sm:gap-[30px] items-center text-text-color flex-1">
          <GuideSpringModal
            isOpen={isGuideOpen}
            setIsOpen={setIsGuideOpen}
          ></GuideSpringModal>
          <div
            className={clsx(
              "w-full gap-3 transition-all",
              screenSaver ? "opacity-0 -top-30" : "opacity-100 top-0"
            )}
          >
            <div className="w-full flex items-start justify-between">
              <CustomButton
                type="standard"
                className="w-auto p-2"
                onClick={() => router.back()}
              >
                <IoChevronBackOutline />
              </CustomButton>
              <div className="settingsDriver">
                <Options timeCube={timeCube} />
              </div>
              <CustomButton
                type="standard"
                className="w-auto p-2 replayDriver"
                onClick={() => driverObj2.drive()}
              >
                <TbRotate />
              </CustomButton>
            </div>
          </div>
          <div
            className={clsx(
              "w-full flex flex-col flex-1 items-center gap-5 sm:gap-[30px] transition-all",
              screenSaver
                ? "-translate-y-15 sm:-translate-y-20 md:-translate-y-22 lg:-translate-y-25 xl:-translate-y-30"
                : "translate-y-0"
            )}
          >
            <div className="countdownDriver w-full">
              <CountDown timeCube={timeCube} />
            </div>
            <div className="w-full flex flex-col flex-1 gap-4 items-center">
              <span
                className={clsx(
                  "text-[14px] sm-[text-16px] transition-all font-bold text-foreground-muted",
                  screenSaver
                    ? "-translate-y-5 opacity-0"
                    : "translate-y-0 opacity-100"
                )}
              >
                1 square ={" "}
                {
                  durationOptions.find(
                    (durationOption) =>
                      durationOption.value === timeCube.cubeDuration
                  )?.label
                }
              </span>

              <div
                className={clsx(
                  "transition-all w-full flex-1 flex  justify-center gridDriver",
                  screenSaver ? "-translate-y-10" : "translate-y-0"
                )}
              >
                <CubeGrid timeCube={timeCube} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CubePage;
