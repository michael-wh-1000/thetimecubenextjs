"use client";

import { FaPen } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { CustomButton } from "../../reusable/customButton";
import clsx from "clsx";
import { Input } from "../../ui/input";
import { useDispatchContext, useStateContext } from "@/lib/functions";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cubeNameSchema, initialTimeCube, TimeCubeDataType } from "@/lib/types";
import { addCube } from "@/lib/server";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { toastErrorStyles, toastSuccessStyles } from "@/themeContent/themes";

export const CreateModal = ({
  children,
  label,
  buttonType,
  icon,
  full,
}: {
  children?: React.ReactNode;
  label: React.ReactNode;
  buttonType?: "standard" | "accent";
  icon?: React.ReactNode;
  full?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCubeName, setNewCubeName] = useState("");
  const dispatch = useDispatchContext();
  const router = useRouter();
  const state = useStateContext();
  const textInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (isOpen) {
      textInputRef.current?.focus();
    }
    if (!isOpen) {
      setNewCubeName("");
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    router.prefetch("/app/cube");
  }, [router]);

  const createNewCube = async () => {
    const newId = nanoid();
    const newTimeCube: TimeCubeDataType = {
      ...initialTimeCube,
      name: newCubeName,
      id: `${newId}`,
    };

    const result = cubeNameSchema.safeParse(newCubeName.trim());

    if (result.success) {
      setError(null);
      if (state.length < 8) {
        if (session) {
          try {
            dispatch({ type: "ADD", payload: newTimeCube });

            const promise = addCube(newTimeCube);
            router.push(`/app/cube?id=${encodeURIComponent(newId)}`);
            const result = await promise;

            if (result?.error) {
              toast.error("Network error, change not saved.", {
                style: toastErrorStyles,
              });
            } else {
              toast.success("TimeCube created successfully", {
                style: toastSuccessStyles,
              });
            }
          } catch (error) {
            toast.error("Network error, change not saved.", {
              style: toastErrorStyles,
            });
          }
        } else {
          dispatch({ type: "ADD", payload: newTimeCube });
          router.push(`/app/cube?id=${encodeURIComponent(newId)}`);
        }
      }
      setNewCubeName("");
      setIsOpen(false);
    } else {
      setError(result.error.issues[0].message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createNewCube();
    }
  };

  return (
    <div className={clsx(full && "w-full")}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CustomButton
            onClick={() => setIsOpen(true)}
            type={buttonType ? buttonType : "standard"}
            icon={icon ? <span>{icon}</span> : <FaPen size={12} />}
          >
            {label}
          </CustomButton>
        </DialogTrigger>
        {state.length < 8 ? (
          <DialogContent
            showCloseButton={false}
            autoFocus={isOpen}
            className="p-6 sm:p-8 md:p-10 rounded-xl bg-background text-text-color border-foreground"
          >
            <DialogTitle className="mr-auto text-[20px] sm:text-[22px] md:text-[24px] font-bold">
              Create New
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
                  placeholder="Enter time cube name"
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
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <p className="text-sm w-full text-left pt-2 text-text-color/60">
                  Note: Default format is day. You can change it in settings
                </p>
              </div>
              <div className="w-full flex justify-between">
                <CustomButton
                  type="accent"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="w-fit"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  type="standard"
                  onClick={createNewCube}
                  className="w-fit"
                >
                  Create
                </CustomButton>
              </div>
            </div>
          </DialogContent>
        ) : (
          <DialogContent
            showCloseButton={false}
            autoFocus={isOpen}
            className="p-6 sm:p-8 md:p-10 rounded-xl bg-background text-text-color border-foreground"
          >
            <DialogTitle className="mr-auto text-[20px] sm:text-[22px] md:text-[24px] font-bold">
              Oops!
            </DialogTitle>
            <DialogDescription className="sr-only">
              This a settings dialog box
            </DialogDescription>
            <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 items-center">
              <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 items-center">
                <span className="text-left text-text-color/80 text-[14px] md:text-[18px]">
                  You can't have more than eight time cubes at a time. Please
                  delete one of the existing ones
                </span>
                <div className="w-full flex justify-between">
                  <CustomButton
                    type="standard"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="justify-center text-center"
                  >
                    Okay
                  </CustomButton>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
