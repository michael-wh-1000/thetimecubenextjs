"use client";

import { useScreenSaverContext } from "@/lib/functions";
import clsx from "clsx";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

const Footer = () => {
  const { screenSaver } = useScreenSaverContext();

  return (
    <footer className="w-full py-5 md:py-[30px] lg:py-[35px] flex justify-center px-5 sm:px-[60px] md:px-20 lg:px-[120px] ">
      <Link href={"/about"} prefetch={true}>
        <button
          className={clsx(
            "cursor-pointer flex items-center gap-2 text-text-color/80 text-[12px] sm:text-[13px] md:text-[14px] ld:text-[15px] transition-all hover:scale-105",
            screenSaver ? "opacity-0" : "opacity-100"
          )}
        >
          <FaInfoCircle />
          About
        </button>
      </Link>
    </footer>
  );
};

export default Footer;
