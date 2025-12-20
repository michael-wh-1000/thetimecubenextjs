"use client";

import { FaPen } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
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
import { cubeNameSchema, TimeCubeDataType } from "@/lib/types";
import { SessionContext } from "@/lib/providers";
import { updateCube } from "@/lib/server";
import { toast } from "sonner";
import { toastErrorStyles, toastSuccessStyles } from "@/themeContent/themes";

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
  const session = useContext(SessionContext);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      textInputRef.current?.focus();
    }
    if (!isOpen) {
      setNewCubeName(timeCube.name);
      setError(null);
    }
  }, [isOpen]);

  const editCube = async () => {
    const result = cubeNameSchema.safeParse(newCubeName.trim());

    if (result.success) {
      setError(null);
      if (session) {
        try {
          dispatch({
            type: "UPDATE",
            payload: {
              id: timeCube.id,
              name: newCubeName,
            },
          });

          const promise = updateCube({
            id: timeCube.id,
            name: newCubeName,
          });
          setIsOpen(false);
          setIsPopoverOpen(false);

          const result = await promise;
          if (result?.error) {
            toast.error("Network error, change not saved.", {
              style: toastErrorStyles,
            });
          } else {
            toast.success("TimeCube updated successfully", {
              style: toastSuccessStyles,
            });
          }
        } catch (error) {
          toast.error("Network error, change not saved.", {
            style: toastErrorStyles,
          });
        }
      } else {
        dispatch({
          type: "UPDATE",
          payload: {
            id: timeCube.id,
            name: newCubeName,
          },
        });
        setIsOpen(false);
        setIsPopoverOpen(false);
      }
    } else {
      setError(result.error.issues[0].message);
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
            <div className="w-full flex flex-col gap-2">
              {children}
              <Input
                ref={textInputRef}
                type="text"
                value={newCubeName}
                placeholder="Enter name"
                onChange={(e) => {
                  setNewCubeName(e.target.value);
                  const result = cubeNameSchema.safeParse(
                    e.target.value.trim()
                  );
                  if (result.success) {
                    setError(null);
                  }
                }}
                onKeyDown={handleKeyDown}
                className="p-4 sm:p-5 border-foreground border rounded-md w-full text-[14px] sm:text-[15px] md:text-[16px] bg-background-muted"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
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
