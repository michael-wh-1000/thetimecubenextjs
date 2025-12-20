import { timeCubes } from "@/utils/db/schema";
import { z } from "zod";
import { nanoid } from "nanoid";

export type TimeCubeDataType = {
  id: string;
  name: string;
  format: string;
  cubeSize: number;
  passedYears: number;
  totalYears: number;
  endDate: Date;
  initialDate: Date;
  cubeDuration: number;
  initialCustomDate: Date;
  endCustomDate: Date;
  birthDate: Date;
  deathDate: Date;
  totalCubes: number;
  createdAt: Date;
};

export type ServerTimeCubeDataType = typeof timeCubes.$inferInsert;

export type ScreenSaverContextType = {
  screenSaver: boolean;
  setScreenSaver: React.Dispatch<React.SetStateAction<boolean>>;
};

export type staticState = TimeCubeDataType[];

export type Action =
  | { type: "INITIALIZE"; payload: staticState }
  | { type: "ADD"; payload: TimeCubeDataType }
  | { type: "DELETE"; payload: TimeCubeDataType }
  | {
      type: "UPDATE";
      payload: { id: string } & Partial<Omit<TimeCubeDataType, "id">>;
    }
  | { type: "RESET"; payload: staticState };

export type AppearanceType = {
  theme: string;
  outline: boolean;
  cubeTutorial: boolean;
  dashboardTutorial: boolean;
};

export type AppearanceAction =
  | { type: "INITIALIZE"; payload: AppearanceType }
  | {
      type: "UPDATE";
      payload: Partial<AppearanceType>;
    };

export type SessionType =
  | {
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      };
      session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
      };
    }
  | null
  | undefined;

export const userNameSchema = z
  .string()
  .min(3, "Name should be at least 3 characters")
  .max(50, "Name can't be longer than 50 characters")
  .refine((val) => !/[<>\"`;]/.test(val), "Name contains invalid characters");

export const cubeNameSchema = z
  .string()
  .min(3, "Name be at least 3 characters")
  .max(50, "Name can't be longer than 50 characters")
  .refine((val) => !/[<>\"`;]/.test(val), "Name contains invalid characters");

export const lifeDurationSchema = z.number().min(0, "Must be greater than 0");

export const emailSchema = z.email({
  message: "Please enter a valid email address",
});

export const durationOptions = [
  {
    label: "1 minute",
    value: 1 / (24 * 60),
  },
  {
    label: "1 hour",
    value: 1 / 24,
  },
  {
    label: "1 day",
    value: 1,
  },
  {
    label: "1 week",
    value: 7,
  },
  {
    label: "1 month",
    value: 30.44,
  },
  {
    label: "6 months",
    value: 182.64,
  },
  {
    label: "1 year",
    value: 365.24,
  },
];

export const initialTimeCube: TimeCubeDataType = {
  id: nanoid(),
  name: "Day Timer",
  format: "day",
  cubeSize: 40,
  totalYears: 0,
  passedYears: 0,
  endDate: new Date(),
  initialDate: new Date(),
  cubeDuration: durationOptions[1].value,
  initialCustomDate: new Date(),
  endCustomDate: new Date(),
  birthDate: new Date(),
  deathDate: new Date(),
  totalCubes: 0,
  createdAt: new Date(),
};

export function getClosestDuration(dbValue: number) {
  return durationOptions.reduce((closest, current) => {
    const currentDiff = Math.abs(current.value - dbValue);
    const closestDiff = Math.abs(closest.value - dbValue);

    return currentDiff < closestDiff ? current : closest;
  });
}
