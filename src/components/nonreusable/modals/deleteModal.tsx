"use client";

import { FaPen } from "react-icons/fa6";
import { useContext, useState } from "react";
import { CustomButton } from "../../reusable/customButton";
import clsx from "clsx";
import { useDispatchContext } from "@/lib/functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TimeCubeDataType } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { deleteCube } from "@/lib/server";
import { SessionContext } from "@/lib/providers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toastErrorStyles, toastSuccessStyles } from "@/themeContent/themes";

export const DeleteModal = ({
  children,
  label,
  buttonType,
  icon,
  setIsPopoverOpen,
  timeCube,
  full,
  type = "cube",
  className,
}: {
  children?: React.ReactNode;
  label: React.ReactNode;
  buttonType?: "standard" | "accent" | "warning";
  icon?: React.ReactNode;
  setIsPopoverOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  timeCube?: TimeCubeDataType;
  full?: boolean;
  type?: "user" | "cube";
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatchContext();
  const session = useContext(SessionContext);
  const router = useRouter();

  const deleteTimeCube = async () => {
    if (timeCube) {
      if (session) {
        try {
          dispatch({ type: "DELETE", payload: timeCube });
          const result = await deleteCube(timeCube);

          if (result?.error) {
            toast.error("Network error, change not saved.", {
              style: toastErrorStyles,
            });
          } else {
            toast.success("TimeCube deleted successfully", {
              style: toastSuccessStyles,
            });
          }
        } catch (error) {
          toast.error("Network error, change not saved.", {
            style: toastErrorStyles,
          });
        }
      } else {
        dispatch({ type: "DELETE", payload: timeCube });
      }
    }
  };

  const deleteUser = async () => {
    await authClient.deleteUser({
      callbackURL: "/app",
      fetchOptions: {
        onSuccess: () => {
          router.push("/app");
          router.refresh();
          toast.success("Account deleted", {
            style: toastSuccessStyles,
          });
        },
        onError: () => {
          toast.error("Failed to delete account", {
            style: toastErrorStyles,
          });
        },
      },
    });
  };

  return (
    <div className={clsx(full && "w-full")}>
      <Dialog
        open={isOpen}
        onOpenChange={(next) => {
          if (!next && setIsPopoverOpen) {
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
            className={className}
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
                {type === "cube" &&
                  "Are you sure you want to delete this time cube?"}
                {type === "user" &&
                  "Are you sure you want to delete your account?"}
              </span>
            </div>
            <div className="w-full flex justify-between">
              <CustomButton
                type="accent"
                onClick={() => {
                  if (setIsPopoverOpen) {
                    setIsOpen(false);
                    setIsPopoverOpen(false);
                  }
                }}
                className="w-fit"
              >
                Cancel
              </CustomButton>
              <CustomButton
                type={buttonType === "warning" ? "warning" : "standard"}
                onClick={
                  type === "cube" && timeCube
                    ? deleteTimeCube
                    : type === "user"
                    ? deleteUser
                    : deleteTimeCube
                }
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
