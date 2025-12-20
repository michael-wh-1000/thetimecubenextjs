"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";

export const SignUpModal = ({
  children,
  label,
  inputRef,
  full,
}: {
  children: React.ReactNode;
  label: React.ReactNode;
  buttonType?: "standard" | "accent";
  icon?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  full?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && inputRef) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className={clsx(full && "w-full sm:w-fit flex justify-center")}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{label}</DialogTrigger>
        <DialogContent
          showCloseButton={false}
          autoFocus={isOpen}
          className={clsx(
            "p-6 sm:p-8 md:p-10 rounded-xl",
            !pathname.startsWith("/app")
              ? "bg-background-static text-text-color-static border-foreground-static"
              : "bg-background text-text-color border-foreground"
          )}
        >
          <DialogTitle className="sr-only">Dialog Title</DialogTitle>
          <DialogDescription className="sr-only">
            This a settings dialog box
          </DialogDescription>
          <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 items-center">
            <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 items-center">
              {children}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
