"use client";

import clsx from "clsx";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { PiCopyrightLight } from "react-icons/pi";
import { SignIn } from "./signin";

const Footer = () => {
  return (
    <footer
      className={clsx(
        "w-full py-6 md:py-10 lg:py-[35px] px-5 sm:px-[60px] md:px-20 lg:px-[120px] border-t-[0.5px] flex flex-col gap-5",
        "bg-background-static text-text-color-static/80 border-t-text-color-static/50"
      )}
    >
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2">
          <Link href={"/?force=true"} prefetch={true}>
            <button
              className={clsx(
                "cursor-pointer flex items-center gap-2 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] transition-all hover:scale-105"
              )}
            >
              Home
            </button>
          </Link>
          <Link href={"/about"} prefetch={true}>
            <button
              className={clsx(
                "cursor-pointer flex items-center gap-2 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] transition-all hover:scale-105"
              )}
            >
              About
            </button>
          </Link>
          <Link href={"/terms"} prefetch={true}>
            <button
              className={clsx(
                "cursor-pointer flex items-center gap-2 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] transition-all hover:scale-105"
              )}
            >
              Terms of Service
            </button>
          </Link>
          <Link href={"/privacy"} prefetch={true}>
            <button
              className={clsx(
                "cursor-pointer flex items-center gap-2 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] transition-all hover:scale-105"
              )}
            >
              Privacy Policy
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <SignIn />
        </div>
      </div>
      <div
        className={clsx("w-full h-[0.5px]", "bg-text-color-static/40")}
      ></div>
      <div className="w-full flex items-center justify-between">
        <div className="gap-1 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] flex items-center">
          <PiCopyrightLight />
          <span>Copyright 2025, All rights reserved</span>
        </div>
        <Link
          href={
            "https://www.instagram.com/the_timecube?igsh=MTZoNjRwcW1vdHoxbA=="
          }
          target="_blank"
        >
          <button
            className={clsx(
              "cursor-pointer flex items-center gap-2 text-[17px] sm:text-[18px] md:text-[19px] lg:text-[20px] transition-all hover:scale-105"
            )}
          >
            <FaInstagram />
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
