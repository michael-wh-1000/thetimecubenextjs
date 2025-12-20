import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface CustomButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  type: "standard" | "accent" | "alternate" | "warning";
}

export const CustomButton = React.forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(({ onClick, children, className = "", icon, type, ...props }, ref) => {
  return (
    <button
      onClick={onClick}
      ref={ref}
      className={twMerge(
        clsx(
          "w-full flex gap-2.5 items-center justify-between  border  font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]",
          styles[type],
          className
        )
      )}
      {...props}
    >
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
});

const styles = {
  standard: "text-text-color bg-background-muted border-foreground/80",
  accent: "text-background bg-foreground-muted border-foreground-muted",
  alternate: "text-text-color bg-foreground border-foreground",
  warning: "text-white bg-red-500 border-red-500",
};
