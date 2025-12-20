"use client";

import { FaPen } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CustomButton } from "./customButton";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const Modal = ({
  children,
  label,
  buttonType,
  icon,
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

  useEffect(() => {
    if (isOpen && inputRef) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className={clsx(full && "w-full")}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CustomButton
            type={buttonType ? buttonType : "standard"}
            icon={icon ? <span>{icon}</span> : <FaPen size={12} />}
          >
            {label}
          </CustomButton>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          autoFocus={isOpen}
          className="p-6 sm:p-8 md:p-10 rounded-xl bg-background text-text-color border-foreground"
        >
          <DialogTitle className="sr-only">Dialog Title</DialogTitle>
          <DialogDescription className="sr-only">
            This a settings dialog box
          </DialogDescription>
          <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 items-center">
            <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 items-center">
              {children}
            </div>
            <CustomButton
              type="alternate"
              onClick={() => {
                setIsOpen(false);
              }}
              className="hover:opacity-100 transition-opacity justify-center"
            >
              done
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
