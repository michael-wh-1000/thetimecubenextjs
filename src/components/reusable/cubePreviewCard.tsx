"use client";

import { CONSTANT, getPercentage } from "@/lib/functions";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SlOptions } from "react-icons/sl";
import { CustomButton } from "./customButton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EditModal } from "../nonreusable/modals/editModal";
import { DeleteModal } from "../nonreusable/modals/deleteModal";
import { FaRegTrashCan } from "react-icons/fa6";
import { TimeCubeDataType } from "@/lib/types";

const CubePreviewCard = ({ timeCube }: { timeCube: TimeCubeDataType }) => {
  const [percentage, setPercentage] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/app/cube?id=${encodeURIComponent(timeCube.id)}`);
  };

  useEffect(() => {
    router.prefetch("/app/cube");
  }, [router]);

  useEffect(() => {
    const newPercentage = getPercentage(timeCube);
    if (typeof newPercentage === "number") {
      setPercentage(newPercentage);
    } else {
      setPercentage(0);
    }

    const percentageInterval = setInterval(() => {
      const newPercentage = getPercentage(timeCube);
      const difference = Math.round(newPercentage - percentage);

      if (difference >= 1) {
        if (typeof newPercentage === "number") {
          setPercentage(newPercentage);
        } else {
          setPercentage(0);
        }
      }
    }, Math.round((timeCube.cubeDuration / 200) * CONSTANT));

    return () => {
      clearInterval(percentageInterval);
    };
  });

  return (
    <div className="flex flex-col gap-2.5">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <CustomButton type="standard" className="self-end w-auto p-2">
            <SlOptions />
          </CustomButton>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-auto border-foreground bg-background p-4 text-text-color rounded-xl flex flex-col gap-3"
        >
          <EditModal
            label="Edit"
            setIsPopoverOpen={setIsPopoverOpen}
            timeCube={timeCube}
          ></EditModal>
          <DeleteModal
            label="Delete"
            setIsPopoverOpen={setIsPopoverOpen}
            timeCube={timeCube}
            icon={<FaRegTrashCan />}
          ></DeleteModal>
        </PopoverContent>
      </Popover>
      <div
        className="flex flex-col flex-1 w-full items-center text-text-color gap-2.5 hover:scale-102 active:scale-98 transition-all cursor-pointer bg-background-muted p-5 rounded-3xl border border-foreground/80"
        onClick={handleClick}
      >
        <div className="w-full aspect-6/3 bg-foreground/50 border-0 border-foreground-muted/40  rounded-xl flex items-center justify-center relative overflow-clip">
          <motion.div
            animate={{ width: `${percentage}%` }}
            className="absolute bg-foreground-muted/50 border-0 h-full top-0 left-0"
          ></motion.div>
          <span className="text-[70px] relative z-1">
            {percentage}
            <span className="text-[50px]">%</span>
          </span>
        </div>
        <div className="font-medium text-[16px] text-center line-clamp-2 word-break hyphens-auto">
          {timeCube.name}
        </div>
      </div>
    </div>
  );
};

export default CubePreviewCard;
