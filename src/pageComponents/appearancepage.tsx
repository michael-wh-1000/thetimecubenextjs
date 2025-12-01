"use client";

import { CustomButton } from "@/components/reusable/customButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAppearanceContext } from "@/lib/functions";
import { updateFavicon } from "@/themeContent/favicontheme";
import { themes } from "@/themeContent/themes";
import clsx from "clsx";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsFillGridFill } from "react-icons/bs";
import { FaPalette } from "react-icons/fa";

const AppearancePage = () => {
  const { appearance, setAppearance } = useAppearanceContext();
  const theme = appearance.theme;
  const outline = appearance.outline;
  const router = useRouter();

  const adjustTheme = (themeName: string) => {
    setAppearance({ ...appearance, theme: themeName });
    updateFavicon(themeName);
  };

  const outlineOptions = [
    {
      label: "on",
      value: true,
    },
    {
      label: "off",
      value: false,
    },
  ];

  return (
    <>
      <motion.div className="pt-[85px] sm:pt-[105px] flex flex-col gap-5 px-5 sm:px-[60px] bg-background text-text-color w-full max-w-[2000px]">
        <div className="flex w-full justify-between text-[12px] sm:text-[14px] md:text-[16px] items-center">
          <CustomButton
            type="standard"
            className="w-auto p-2 left-0 top-0"
            onClick={() => router.back()}
          >
            <IoChevronBackOutline />
          </CustomButton>
          <span>
            Current theme:{" "}
            <span className="font-semibold">{theme.toUpperCase()}</span>
          </span>
        </div>
        <div className="text-text-color flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <BsFillGridFill />
            <span className="text-[18px] sm:text-[20px]">Outline</span>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-[14px] sm:text-[15px] md:text-[16px] text-text-color/80">
              This adds an outline to the squares in the grid
            </span>
            <ToggleGroup
              type="single"
              defaultValue={outline ? "on" : "off"}
              onValueChange={(val) => {
                if (!val) return;

                if (val) {
                  const newValue =
                    outlineOptions.find(
                      (outlineOption) => outlineOption.label === val
                    )?.value ?? false;

                  setAppearance({ ...appearance, outline: newValue });
                }
              }}
              className="flex items-center gap-2 w-full"
            >
              {outlineOptions.map((outlineOption) => (
                <ToggleGroupItem
                  value={outlineOption.label}
                  onClick={(e) => {
                    const toggleValue = outline ? "on" : "off";
                    if (toggleValue === outlineOption.label) e.preventDefault();
                  }}
                  className={clsx(
                    "data-[state=on]:bg-foreground-muted data-[state=on]:text-background",
                    "w-full sm:max-w-60 md:max-w-[260px] lg:max-w-[280px] xl:max-w-[300px] py-2 hover:bg-foreground/20 hover:text-inherit bg-foreground/50 rounded-lg border-0"
                  )}
                  key={outlineOption.label}
                >
                  {outlineOption.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        <div className="text-text-color flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <FaPalette />
            <span className="text-[18px] sm:text-[20px]">Themes</span>
          </div>

          <motion.div
            initial={{ opacity: 0.8, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.8, y: 10 }}
            className="w-full max-w-[1400px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-2.5"
          >
            {Object.keys(themes).map((themeName) => {
              const themeColors = themes[themeName];
              return (
                <button
                  key={themeName}
                  style={{
                    background: themeColors.backgroundMuted,
                    color: themeColors.foregroundMuted,
                    borderColor: themeColors.foregroundMuted,
                  }}
                  className={`p-1.5 text-[12px] sm:text-[14px] md:text-[16px] rounded-lg w-full cursor-pointer hover:scale-[102%] transform duration-300`}
                  onClick={() => adjustTheme(themeName)}
                >
                  {themeName}
                </button>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AppearancePage;
