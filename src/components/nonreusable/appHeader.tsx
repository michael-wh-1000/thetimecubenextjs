"use client";

import LogoIcon from "@/assets/logoicon";
import { IoExtensionPuzzle } from "react-icons/io5";
import { useScreenSaverContext } from "@/lib/functions";
import clsx from "clsx";
import { FaEye } from "react-icons/fa";
import { TbUserFilled } from "react-icons/tb";
import { FaEyeSlash } from "react-icons/fa";
import { CustomButton } from "../reusable/customButton";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SignIn } from "./signin";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SignOut } from "./signout";
import { SessionContext } from "@/lib/providers";

const AppHeader = () => {
  const { screenSaver, setScreenSaver } = useScreenSaverContext();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const session = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    if (session) {
      router.prefetch("/app/profile");
    }

    if (pathname === "/") {
      document.body.classList.add("scroll-special");
    } else {
      document.body.classList.remove("scroll-special");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-[50%] -translate-x-[50%] text-[16px] w-full px-5 sm:px-[60px] max-w-[2000px] h-20 sm:h-[90px] text-text-color pt-[env(safe-area-inset-top)] z-10",
        pathname === "/"
          ? scrolled
            ? "bg-background-static"
            : "bg-background-static/0"
          : "bg-background"
      )}
    >
      <nav className="w-full h-full flex justify-between items-center">
        <Link
          href={pathname.startsWith("/app") ? "/app" : "/?force=true"}
          prefetch={true}
        >
          <div className="flex min-w-0 gap-[5px] sm:gap-[7px] items-center heading-font text-text-color font-semibold">
            <LogoIcon className="h-9 sm:h-11 md:h-12 w-auto" />
            <div
              className={clsx(
                "flex flex-col gap-0.5 sm:gap-1 transition-all ",
                pathname.startsWith("/app") ? "hidden" : "block"
              )}
            >
              <h2
                className={clsx(
                  "leading-0 text-[7px] sm:text-[9px] md:text-[10px] lg:text-[12px]",
                  pathname === "/"
                    ? "text-text-color-static/60"
                    : "text-text-color/60"
                )}
              >
                the
              </h2>
              <h1
                className={clsx(
                  "text-[16.3px] sm:text-[19px] md:text-[21.34px] lg:text-[26px] leading-none",
                  pathname === "/"
                    ? "text-text-color-static"
                    : "text-text-color"
                )}
              >
                timecube
              </h1>
            </div>
          </div>
        </Link>
        <div className="flex min-w-0 gap-4 sm:gap-5 lg:gap-5 items-center">
          {pathname !== "/" && (
            <button
              className={clsx(
                "hover:text-text-color transition-transform cursor-pointer",
                screenSaver ? "opacity-0" : "opacity-100",
                pathname === "/app/appearance"
                  ? "text-text-color"
                  : "text-text-color/80"
              )}
            >
              <Link
                href={"/app/appearance"}
                className="text-[18px] sm:text-[19px] md:text-[20px] themeDriver"
                prefetch={true}
              >
                <div className="flex gap-1 items-center">
                  <IoExtensionPuzzle />
                  <span className="text-[12px] sm:text-[13px] md:text-[14px] hidden sm:block">
                    appearance
                  </span>
                </div>
              </Link>
            </button>
          )}
          {session ? (
            pathname !== "/" && (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    className={clsx(
                      "hover:text-text-color transition-transform py-2 cursor-pointer",
                      screenSaver ? "opacity-0" : "opacity-100",
                      "text-text-color/80"
                    )}
                  >
                    <div className="flex gap-1 items-center text-[18px] sm:text-[19px] md:text-[20px]">
                      <TbUserFilled />
                      <span className="text-[12px] sm:text-[13px] md:text-[14px]">
                        {session?.user.name.split(" ")[0].length <= 12
                          ? session?.user.name.split(" ")[0]
                          : session?.user.name
                              .split(" ")[0]
                              .slice(0, 12)
                              .concat("...")}
                      </span>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-auto border-foreground bg-background p-4 text-text-color rounded-xl flex flex-col gap-3"
                >
                  <CustomButton
                    type="standard"
                    className="text-[14px]"
                    onClick={() => {
                      router.push("/app/profile");
                      setOpen(false);
                    }}
                  >
                    View Profile
                  </CustomButton>
                  <SignOut className="text-[14px]" />
                </PopoverContent>
              </Popover>
            )
          ) : (
            <SignIn />
          )}
          {pathname === "/app/cube" && (
            <CustomButton
              className={clsx(
                "px-2 sm:px-4 focusDriver w-fit",
                screenSaver
                  ? "bg-foreground text-text-color"
                  : "bg-background-muted"
              )}
              type="standard"
              onClick={() => setScreenSaver((previousValue) => !previousValue)}
            >
              {screenSaver ? <FaEyeSlash /> : <FaEye />}
              <span className="hidden sm:block text-[12px] sm:text-[13px] md:text-[14px]">
                Focus Mode
              </span>
            </CustomButton>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
