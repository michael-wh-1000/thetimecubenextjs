import { FaPen } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
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

const SpringModal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsOpen(false);
          }}
          className="bg-background/40 backdrop-blur p-6 sm:p-8 fixed inset-0  z-50 grid place-items-center cursor-pointer pointer-events-none"
        >
          <motion.div
            initial={{ y: "20px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "20px", opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-background text-text-color p-6 sm:p-8 md:p-10 rounded-xl w-full max-w-lg  cursor-default border border-foreground relative overflow-hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 items-center">
              {children}
              <span className="text-center text-text-color/80 text-[12px] md:text-[14px]">
                Your settings are saved even if you close the browser
              </span>
              {/* <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-[18px] bg-foreground   text-text-color font-semibold w-full py-3 rounded-md"
              >
                done
              </button> */}
              <CustomButton
                type="alternate"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="hover:opacity-90 transition-opacity justify-center"
              >
                done
              </CustomButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
