"use client";

import { FaPen } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { CustomButton } from "../../reusable/customButton";
import { Input } from "../../ui/input";
import { useDispatchContext } from "@/lib/functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { TimeCubeDataType } from "@/lib/types";

export const EditModal = ({
  children,
  label,
  buttonType,
  icon,
  full,
  setIsPopoverOpen,
  timeCube,
}: {
  children?: React.ReactNode;
  label: React.ReactNode;
  buttonType?: "standard" | "accent";
  icon?: React.ReactNode;
  full?: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  timeCube: TimeCubeDataType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCubeName, setNewCubeName] = useState(timeCube.name);
  const dispatch = useDispatchContext();
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      textInputRef.current?.focus();
    }
  }, [isOpen]);

  const editCube = () => {
    if (newCubeName.length > 0) {
      dispatch({
        type: "UPDATE",
        payload: { id: timeCube.id, name: newCubeName },
      });

      setIsOpen(false);
      setIsPopoverOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editCube();
    }
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
            onClick={() => setIsOpen(true)}
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
          <DialogTitle className="mr-auto text-[20px] sm:text-[22px] md:text-[24px] font-bold">
            Edit Name
          </DialogTitle>
          <DialogDescription className="sr-only">
            This a settings dialog box
          </DialogDescription>
          <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 items-center">
            <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 items-center">
              {children}
              <Input
                ref={textInputRef}
                type="text"
                value={newCubeName}
                placeholder="Enter name"
                onChange={(e) => setNewCubeName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="p-4 sm:p-5 border-foreground border rounded-md w-full text-[14px] sm:text-[15px] md:text-[16px] bg-background-muted"
              />
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
                onClick={editCube}
                className="w-fit"
              >
                Done
              </CustomButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
