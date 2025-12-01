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
  error: Boolean;
  totalCubes: number;
};

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
};
