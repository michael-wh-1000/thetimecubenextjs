"use client";

import { FiPlus } from "react-icons/fi";
import CubePreviewCard from "../components/reusable/cubePreviewCard";
import { CreateModal } from "@/components/nonreusable/modals/createModal";
import { useAppearanceContext, useStateContext } from "@/lib/functions";
import LogoIcon from "@/assets/logoicon";
import { useContext, useEffect, useMemo } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { SessionContext } from "@/lib/providers";
import { updateAppearance } from "@/lib/server";

const DashboardPage = () => {
  const state = useStateContext();
  const { appearance, appearanceDispatch } = useAppearanceContext();
  const session = useContext(SessionContext);

  const driverObj = useMemo(
    () =>
      driver({
        popoverClass: "driverjs-theme",
        showProgress: false,
        steps: [
          {
            element: ".createModal",
            popover: {
              title: "Create New",
              description:
                'This button is used to create a new "time cube" timer',
            },
          },
          {
            element: ".themeDriver",
            popover: {
              title: "Appearance",
              description: "Click here to change the appearance of the site",
            },
          },
          {
            element: ".dashboardDriver",
            popover: {
              title: "Preview Cards",
              description:
                "Preview cards for each time cube will appear here. Click them to go to the full page",
            },
          },
        ],
      }),
    []
  );

  const updateDashboardTutorial = async () => {
    if (session) {
      try {
        const result = await updateAppearance({ dashboardTutorial: true });

        appearanceDispatch({
          type: "UPDATE",
          payload: { dashboardTutorial: true },
        });
      } catch (error) {
        console.error("Error updating database");
      }
    } else {
      appearanceDispatch({
        type: "UPDATE",
        payload: { dashboardTutorial: true },
      });
    }
  };

  useEffect(() => {
    const dashboardTutorial = localStorage.getItem("dashboardTutorial");

    if (!appearance.dashboardTutorial) {
      driverObj.drive();
      updateDashboardTutorial();
      localStorage.setItem("dashboardTutorial", "true");
    }
    if (dashboardTutorial && !appearance.dashboardTutorial) {
      updateDashboardTutorial();
    }
  }, []);

  useEffect(() => {
    return () => {
      driverObj.destroy();
    };
  }, [driverObj]);

  return (
    <>
      <div className="pt-[90px] sm:pt-[110px] pb-5 mb-5 sm:pb-10 sm:mb-10 flex flex-col gap-5 px-5 sm:px-[60px] md:px-20 lg:px-[100px] bg-background text-text-color w-full max-w-[2000px] min-h-screen transition-scope animate-on-load">
        <div className="flex w-full justify-between items-center">
          <span className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
            All Time Cubes
          </span>
          <div className="createModal">
            <CreateModal
              label="Create New"
              buttonType="accent"
              icon={<FiPlus />}
            ></CreateModal>
          </div>
        </div>
        {state.length === 0 ? (
          <div className="w-full flex flex-col flex-1 justify-center items-center bg-background-muted/40 border-foreground/80 border rounded-2xl text-[16px] px-5 sm:px-[60px] md:px-20 lg:px-[100px] text-text-color/80 gap-[30px] dashboardDriver">
            <LogoIcon className="h-16 sm:h-18 md:h-20 lg:h-22 w-auto opacity-40" />
            <span className="text-center text-[14px] sm:text-[15px] md:text-[16px]">
              Click the "Create New" button to get started
            </span>
          </div>
        ) : (
          <div className="w-full flex justify-center dashboardDriver">
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center items-stretch gap-[25px] sm:gap-[30px] md:gap-[35px] lg:gap-10">
              {state
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map((timeCube) => (
                  <CubePreviewCard timeCube={timeCube} key={timeCube.id} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
