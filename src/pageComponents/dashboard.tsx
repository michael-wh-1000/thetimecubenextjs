"use client";

import { FiPlus } from "react-icons/fi";
import CubePreviewCard from "../components/reusable/cubePreviewCard";
import { CreateModal } from "@/components/nonreusable/modals/createModal";
import { useStateContext } from "@/lib/functions";
import LogoIcon from "@/assets/logoicon";
import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const DashboardPage = () => {
  const state = useStateContext();

  const driverObj = driver({
    popoverClass: "driverjs-theme",
    showProgress: false,
    steps: [
      {
        element: ".createModal",
        popover: {
          title: "Create New",
          description: 'This button is used to create a new "time cube" timer',
        },
      },
      {
        element: ".themeDriver",
        popover: {
          title: "Themes",
          description: "Click here to change themes",
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
  });

  useEffect(() => {
    const dashboardTutorial = localStorage.getItem("dashboardTutorial");

    if (!dashboardTutorial) {
      driverObj.drive();
      localStorage.setItem("dashboardTutorial", "true");
    }
  }, []);

  return (
    <>
      <div className="pt-[90px] sm:pt-[110px] flex flex-col gap-5 px-5 sm:px-[60px] md:px-20 lg:px-[100px] bg-background text-text-color w-full max-w-[2000px] min-h-[calc(100vh-90px)] sm:min-h-[calc(100vh-110px)]">
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
            <span className="text-center">
              Click the "Create New" button to get started
            </span>
          </div>
        ) : (
          <div className="w-full flex justify-center dashboardDriver">
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center items-stretch gap-[25px] sm:gap-[30px] md:gap-[35px] lg:gap-10">
              {state.map((timeCube) => (
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
