"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignIn } from "./signin";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

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
        scrolled ? "bg-background-static" : "bg-background-static/0"
      )}
    >
      <nav className="w-full h-full flex justify-between items-center">
        <Link href={"/?force=true"} prefetch={true}>
          <div className="flex min-w-0 gap-[5px] sm:gap-[7px] items-center heading-font text-text-color font-semibold">
            <img
              src={"/images/logoicon.svg"}
              className="h-9 sm:h-11 md:h-12 w-auto"
            />
            <div
              className={clsx("flex flex-col gap-0.5 sm:gap-1 transition-all")}
            >
              <h2
                className={clsx(
                  "leading-0 text-[7px] sm:text-[9px] md:text-[10px] lg:text-[12px]",
                  "text-text-color-static/60"
                )}
              >
                the
              </h2>
              <h1
                className={clsx(
                  "text-[16.3px] sm:text-[19px] md:text-[21.34px] lg:text-[26px] leading-none",
                  "text-text-color-static"
                )}
              >
                timecube
              </h1>
            </div>
          </div>
        </Link>
        <div className="flex min-w-0 gap-4 sm:gap-5 lg:gap-5 items-center">
          <SignIn />
        </div>
      </nav>
    </header>
  );
};

export default Header;
