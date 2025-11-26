"use client";

import LogoIcon from "@/assets/logoicon";
import { TbPaintFilled } from "react-icons/tb";
import { useScreenSaverContext } from "@/lib/functions";
import clsx from "clsx";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CustomButton } from "../reusable/customButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const { screenSaver, setScreenSaver } = useScreenSaverContext();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-[50%] -translate-x-[50%] text-[16px] w-full px-5 sm:px-[60px] max-w-[2000px] h-20 sm:h-[100px] bg-background text-text-color z-10 pt-[env(safe-area-inset-top)]">
      <nav className="w-full h-full flex justify-between items-center">
        <Link href={"/"} prefetch={true}>
          <div className="flex min-w-0 gap-[5px] sm:gap-[7px] items-center heading-font text-text-color font-semibold">
            <LogoIcon className="h-9 sm:h-11 md:h-12 lg:h-14 w-auto" />
            <div
              className={clsx(
                "flex flex-col gap-0.5 sm:gap-1 transition-all ",
                screenSaver ? "opacity-0" : "opacity-100"
              )}
            >
              <h2 className="text-text-color/60 leading-0 text-[7px] sm:text-[9px] md:text-[10px] lg:text-[12px]">
                the
              </h2>
              <h1 className="text-[16.3px] sm:text-[21px] md:text-[23.34px] lg:text-[28px] leading-none">
                timecube
              </h1>
            </div>
          </div>
        </Link>

        <div className="flex min-w-0 gap-4 sm:gap-6 lg:gap-8 items-center">
          <button
            className={clsx(
              "hover:text-text-color transition-transform hover:scale-105",
              screenSaver ? "opacity-0" : "opacity-100",
              pathname === "/themes"
                ? "text-text-color"
                : "text-foreground-muted"
            )}
          >
            <Link
              href={"/themes"}
              className="flex gap-1 items-center text-[12px] sm:text-[14px] md:text-[16px] themeDriver"
              prefetch={true}
            >
              <TbPaintFilled /> themes
            </Link>
          </button>
          {pathname === "/cube" && (
            <CustomButton
              className={clsx(
                "px-2 sm:px-4 focusDriver",
                screenSaver
                  ? "bg-foreground text-text-color"
                  : "bg-background-muted"
              )}
              type="standard"
              onClick={() => setScreenSaver((previousValue) => !previousValue)}
            >
              {screenSaver ? <FaEyeSlash /> : <FaEye />}
              <span className="hidden sm:block">Focus Mode</span>
            </CustomButton>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
