"use client";

import { FaPen } from "react-icons/fa6";
import { useState } from "react";
import { CustomButton } from "../../reusable/customButton";
import clsx from "clsx";
import { TimeCubeDataType } from "@/lib/providers";
import { useDispatchContext } from "@/lib/functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const DeleteModal = ({
  children,
  label,
  buttonType,
  icon,
  setIsPopoverOpen,
  timeCube,
  full,
}: {
  children?: React.ReactNode;
  label: React.ReactNode;
  buttonType?: "standard" | "accent";
  icon?: React.ReactNode;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  timeCube: TimeCubeDataType;
  full?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatchContext();

  const deleteCube = () => {
    dispatch({ type: "DELETE", payload: timeCube });
  };

  return (
    <div className={clsx(full && "w-full")}>
      <Dialog
        open={isOpen}
        onOpenChange={(next) => {
          if (!next) {
            setIsPopoverOpen(false);
          }
          setIsOpen(next);
        }}
      >
        <DialogTrigger asChild>
          <CustomButton
            onClick={() => {
              setIsOpen(true);
            }}
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
          <DialogTitle className="sr-only">Delete</DialogTitle>
          <DialogDescription className="sr-only">
            This a settings dialog box
          </DialogDescription>
          <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 items-center">
            <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 items-center">
              {children}
              <span className="text-center text-text-color/80 text-[14px] md:text-[18px]">
                Are you sure you want to delete this time cube?
              </span>
            </div>
            <div className="w-full flex justify-between">
              <CustomButton
                type="accent"
                onClick={() => {
                  setIsOpen(false);
                  setIsPopoverOpen(false);
                }}
                className="w-fit"
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="standard"
                onClick={deleteCube}
                className="w-fit"
              >
                Confirm
              </CustomButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
