"use client";

import { IoIosArrowDown } from "react-icons/io";
import { useContext, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CustomButton } from "./customButton";
import { Input } from "../ui/input";
import { Action, TimeCubeDataType } from "@/lib/types";
import { updateCubeClient } from "@/lib/functions";
import { SessionContext } from "@/lib/providers";

export default function DatePicker({
  date,
  dispatch,
  field,
  timeCubeItem,
}: {
  date: Date;
  dispatch: React.Dispatch<Action>;
  field: "initialCustomDate" | "endCustomDate";
  timeCubeItem: TimeCubeDataType;
}) {
  const [dateOpen, setDateOpen] = useState(false);
  const [time, setTime] = useState(date.toTimeString().split(" ")[0]);
  const [month, setMonth] = useState<Date | undefined>(date);
  const session = useContext(SessionContext);

  const handleDaySelect = async (date: Date) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      seconds
    );

    setMonth(newSelectedDate);

    updateCubeClient(
      { id: timeCubeItem.id, [field]: newSelectedDate },
      dispatch,
      session
    );
  };

  const handleTimeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      return;
    }

    setTime(e.target.value);
    const [hours, minutes, seconds] = e.target.value.split(":").map(Number);

    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      seconds
    );

    setMonth(newSelectedDate);

    updateCubeClient(
      { id: timeCubeItem.id, [field]: newSelectedDate },
      dispatch,
      session
    );
  };

  return (
    <div className="flex flex-col gap-3 scale-95 sm:scale-100 w-full">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[14px]">Select Date:</span>
        </div>
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <CustomButton
              type="standard"
              className="w-full"
              icon={<IoIosArrowDown />}
            >
              {format(date, "PPP")}
            </CustomButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 py-1 border-0 rounded-lg bg-transparent shadow-none"
            align="start"
            portal={false}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                if (date) {
                  handleDaySelect(date);
                }
              }}
              captionLayout="dropdown"
              className="rounded-xl border p-4 text-text-color border-foreground bg-background-muted"
              classNames={{
                month_caption: "mx-0",
              }}
              startMonth={new Date(1000, 0)}
              endMonth={new Date(3000, 11)}
              month={month}
              onMonthChange={setMonth}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[14px]">Select Time:</span>
        </div>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full border  font-medium px-4 py-4 rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-color bg-background-muted border-foreground/80"
        />
      </div>
    </div>
  );
}
