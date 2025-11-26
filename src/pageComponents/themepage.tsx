"use client";

import { CustomButton } from "@/components/reusable/customButton";
import { useThemeContext } from "@/lib/functions";
import { updateFavicon } from "@/themeContent/favicontheme";
import { themes } from "@/themeContent/themes";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const ThemePage = () => {
  const { theme, setTheme } = useThemeContext();
  const router = useRouter();

  const adjustTheme = (themeName: string) => {
    setTheme(themeName);
    updateFavicon(themeName);
    localStorage.setItem("theme", themeName);
  };

  return (
    <>
      <motion.div className="pt-[85px] sm:pt-[105px] flex flex-col gap-5 px-5 sm:px-[60px] bg-background text-text-color w-full max-w-[2000px]">
        <div className="flex w-full justify-between text-[12px] sm:text-[14px] md:text-[16px]">
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
        <motion.div
          initial={{ opacity: 0.8, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.8, y: 10 }}
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-2.5 sm:gap-[15px] md:gap-5 lg:gap-[25px]"
        >
          {Object.keys(themes).map((themeName) => {
            const themeColors = themes[themeName];
            return (
              <button
                key={themeName}
                style={{
                  background: themeColors.backgroundMuted,
                  color: themeColors.foregroundMuted,
                }}
                className={`p-2 text-[12px] sm:text-[14px] md:text-[16px] rounded-lg w-full cursor-pointer hover:scale-[102%] transform duration-300`}
                onClick={() => adjustTheme(themeName)}
              >
                {themeName}
              </button>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ThemePage;
