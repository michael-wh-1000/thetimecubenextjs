"use client";

import { FaPen } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import { CustomButton } from "../../reusable/customButton";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateCubeClient, useDispatchContext } from "@/lib/functions";
import { SessionContext } from "@/lib/providers";
import { lifeDurationSchema, TimeCubeDataType } from "@/lib/types";
import { Input } from "@/components/ui/input";

export const LifeModal = ({
  children,
  label,
  buttonType,
  icon,
  full,
  timeCube,
  property,
}: {
  children: React.ReactNode;
  label: React.ReactNode;
  buttonType?: "standard" | "accent";
  icon?: React.ReactNode;
  full?: boolean;
  timeCube: TimeCubeDataType;
  property: "totalYears" | "passedYears";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatchContext();
  const session = useContext(SessionContext);
  const [value, setValue] = useState(
    Math.round(timeCube[property] * 100) / 100
  );

  useEffect(() => {
    if (isOpen && inputRef) {
      inputRef.current?.focus();
    }
    if (!isOpen) {
      setValue(Math.round(timeCube[property] * 100) / 100);
    }
  }, [isOpen]);

  const submitValue = () => {
    const result = lifeDurationSchema.safeParse(value);
    if (result.success) {
      if (property === "passedYears") {
        const newBirthDate = new Date(
          new Date().getFullYear() - value,
          new Date().getMonth(),
          new Date().getDate()
        );
        updateCubeClient(
          {
            id: timeCube.id,
            passedYears: value,
            birthDate: newBirthDate,
            deathDate: new Date(
              newBirthDate.getFullYear() + timeCube.totalYears,
              newBirthDate.getMonth(),
              newBirthDate.getDate()
            ),
          },
          dispatch,
          session
        );
      }

      if (property === "totalYears") {
        const birthDate = new Date(timeCube.birthDate);

        updateCubeClient(
          {
            id: timeCube.id,
            totalYears: value,
            deathDate: new Date(
              birthDate.getFullYear() + value,
              birthDate.getMonth(),
              birthDate.getDate()
            ),
          },
          dispatch,
          session
        );
      }

      setIsOpen(false);
    }
  };

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
              <div className="w-full flex flex-col gap-4">
                {children}
                <div className="w-full flex flex-col gap-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const result = lifeDurationSchema.safeParse(
                        Number(e.target.value)
                      );
                      if (result.success) {
                        setValue(Number(e.target.value));
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitValue();
                      }
                    }}
                    className="py-2 px-4 border-foreground border rounded-md w-full"
                  />
                </div>
              </div>
            </div>
            <CustomButton
              type="alternate"
              onClick={submitValue}
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
