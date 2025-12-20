"use client";

import { RiSettings5Fill } from "react-icons/ri";
import { useState } from "react";
import { CustomButton } from "../reusable/customButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const SettingsModal = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CustomButton
          type="standard"
          icon={<RiSettings5Fill />}
          onClick={() => setIsOpen(true)}
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
  );
};
