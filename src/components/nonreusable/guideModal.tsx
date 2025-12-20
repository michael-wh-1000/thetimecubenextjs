"use client";

import { RiSettings5Fill } from "react-icons/ri";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CustomButton } from "../reusable/customButton";

export const GuideModal = ({ label }: { label: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-background-muted border border-foreground font-medium px-4 py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer text-[14px] sm:text-[16px] "
      >
        <div className="flex gap-2.5 items-center w-full justify-between">
          {label}
          <RiSettings5Fill />
        </div>
      </button>
      <GuideSpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></GuideSpringModal>
    </div>
  );
};

export const GuideSpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [step, setStep] = useState(1);

  const stepForward = () => {
    if (step < 5) setStep((prev) => prev + 1);
  };

  const stepBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

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
          className=" backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-hidden cursor-pointer"
        >
          <motion.div
            initial={{ y: "20px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "20px", opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background text-text-color p-6 sm:p-6 md:p-8 lg:p-10 rounded-xl w-full max-w-lg shadow-xl cursor-default border border-foreground relative overflow-hidden"
          >
            <div className="w-full flex justify-between pb-4">
              <h1 className="text-[22px] sm:text-[24px] font-bold">Tutorial</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:bg-foreground rounded-full w-[30px] h-[30px] flex items-center justify-center"
              >
                <RxCross2 className="text-[24px]" />
              </button>
            </div>
            <div className="flex flex-col gap-5 items-center">
              {step == 1 && (
                <motion.div
                  key={step}
                  initial={{ x: "10%", opacity: 0 }}
                  animate={{ x: "0", opacity: 1 }}
                  exit={{ x: "-10%", opacity: 0 }}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="bg-foreground/30 w-full aspect-video rounded-md">
                    <img
                      src="assetimages/grid.png"
                      className="w-full h-auto rounded-md"
                    />
                  </div>

                  <h2 className="text-[18px] sm:text-[20px] font-medium">
                    Grid
                  </h2>
                  <ul className="text-[12px] sm:text-[14px] flex flex-col gap-2">
                    <li>
                      This displays a visual of the total time depending on your
                      settings
                    </li>
                    <li>
                      The cubes gradually fill up till you have not time left
                      after which they'll be completely full
                    </li>
                  </ul>
                </motion.div>
              )}
              {step == 2 && (
                <motion.div
                  key={step}
                  initial={{ x: "10%", opacity: 0 }}
                  animate={{ x: "0", opacity: 1 }}
                  exit={{ x: "-10%", opacity: 0 }}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="bg-foreground/30 w-full aspect-video rounded-md">
                    <img
                      src="assetimages/timer.png"
                      className="w-full h-auto rounded-md"
                    />
                  </div>

                  <h2 className="text-[18px] sm:text-[20px] font-medium">
                    Timer
                  </h2>
                  <ul className="text-[12px] sm:text-[14px] flex flex-col gap-2">
                    <li>
                      This is a countdown of your time left. It counts down to
                      zero
                    </li>
                  </ul>
                </motion.div>
              )}
              {step == 3 && (
                <motion.div
                  key={step}
                  initial={{ x: "10%", opacity: 0 }}
                  animate={{ x: "0", opacity: 1 }}
                  exit={{ x: "-10%", opacity: 0 }}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="bg-foreground/30 w-full aspect-video rounded-md">
                    <img
                      src="assetimages/settings.png"
                      className="w-full h-auto rounded-md"
                    />
                  </div>

                  <h2 className="text-[18px] sm:text-[20px] font-medium">
                    Settings
                  </h2>
                  <ul className="text-[12px] sm:text-[14px] flex flex-col gap-2">
                    <li>
                      The settings control what the grid and timer display
                    </li>
                    <li>
                      Adjust them to your liking. You can count down to the next
                      year, the end of your semester, anything!
                    </li>
                  </ul>
                </motion.div>
              )}
              {step == 4 && (
                <motion.div
                  key={step}
                  initial={{ x: "10%", opacity: 0 }}
                  animate={{ x: "0", opacity: 1 }}
                  exit={{ x: "-10%", opacity: 0 }}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="bg-foreground/30 w-full aspect-video rounded-md">
                    <img
                      src="assetimages/screensaver.png"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <h2 className="text-[18px] sm:text-[20px] font-medium">
                    Screen Saver
                  </h2>
                  <ul className="text-[12px] sm:text-[14px] flex flex-col gap-2">
                    <li>
                      Hides all contols and settings to give a minimalist
                      appearance for display
                    </li>
                  </ul>
                </motion.div>
              )}

              {step == 5 && (
                <motion.div
                  key={step}
                  initial={{ x: "10%", opacity: 0 }}
                  animate={{ x: "0", opacity: 1 }}
                  exit={{ x: "-10%", opacity: 0 }}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="bg-foreground/30 w-full aspect-video rounded-md">
                    <img
                      src="assetimages/themes.png"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <h2 className="text-[18px] sm:text-[20px] font-medium">
                    Themes
                  </h2>
                  <ul className="text-[12px] sm:text-[14px] flex flex-col gap-2">
                    <li>
                      Plenty of themes to choose from. Pick the one you like
                    </li>
                  </ul>
                </motion.div>
              )}

              <div className="w-full flex justify-between">
                <CustomButton
                  type="alternate"
                  onClick={() => stepBack()}
                  className="w-fit"
                >
                  Back
                </CustomButton>

                {step === 5 ? (
                  <CustomButton
                    type="alternate"
                    onClick={() => setIsOpen(false)}
                    className="w-fit"
                  >
                    Complete
                  </CustomButton>
                ) : (
                  <CustomButton
                    type="alternate"
                    onClick={() => stepForward()}
                    className="w-fit"
                  >
                    Next
                  </CustomButton>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
