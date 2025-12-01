"use client";

import {
  createContext,
  useState,
  useEffect,
  useReducer,
  Dispatch,
  SetStateAction,
} from "react";
import { themes } from "../themeContent/themes";
import { updateFavicon } from "../themeContent/favicontheme";
import { nanoid } from "nanoid";
import ThemeWrapper from "@/themeContent/themewrapper";
import {
  Action,
  AppearanceType,
  ScreenSaverContextType,
  staticState,
  TimeCubeDataType,
} from "./types";

export const ScreenSaverContext = createContext<ScreenSaverContextType | null>(
  null
);

export const AppearanceContext = createContext<
  | {
      appearance: AppearanceType;
      setAppearance: Dispatch<SetStateAction<AppearanceType>>;
    }
  | undefined
>(undefined);

export const StateContext = createContext<staticState | undefined>(undefined);

export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

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

export const formatTypes = ["day", "week", "month", "year", "life", "custom"];

const initializer = (
  initialValue: staticState,
  setMounted: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const storedState = localStorage.getItem("cubeSettings");
    if (storedState) {
      const parsedState: staticState = JSON.parse(storedState);

      setMounted(true);
      return parsedState.map((parsedStateItem) => {
        return {
          id: parsedStateItem.id,
          name: parsedStateItem.name,
          format: parsedStateItem.format,
          cubeSize: Number(parsedStateItem.cubeSize),
          totalYears: Number(parsedStateItem.totalYears),
          passedYears: Number(parsedStateItem.passedYears),
          endDate: new Date(parsedStateItem.endDate),
          initialDate: new Date(parsedStateItem.initialDate),
          cubeDuration: Number(parsedStateItem.cubeDuration),
          initialCustomDate: new Date(parsedStateItem.initialCustomDate),
          endCustomDate: new Date(parsedStateItem.endCustomDate),
          error: parsedStateItem.error,
          totalCubes: Number(parsedStateItem.totalCubes),
        };
      });
    }
  } catch (error) {
    console.error("Failed to load state", error);
  }
  setMounted(true);
  return initialValue;
};

export const initialStaticState: staticState = [];

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
  error: false,
  totalCubes: 0,
};

function reducer(state: staticState, action: Action): staticState {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE":
      return state.map((item) =>
        item.id == action.payload.id ? { ...item, ...action.payload } : item
      );
    case "RESET":
      return action.payload;
    default:
      return state;
  }
}

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  // const [theme, setTheme] = useState("standard dark");
  const [appearance, setAppearance] = useState<AppearanceType>(() => {
    if (typeof window === "undefined") {
      return {
        theme: "standard dark",
        outline: false,
      };
    }

    try {
      const savedAppearance = localStorage.getItem("appearance");

      if (savedAppearance) {
        const parsedAppearance: AppearanceType = JSON.parse(savedAppearance);
        const savedTheme = parsedAppearance.theme;

        if (themes[savedTheme]) {
          updateFavicon(savedTheme);
          return parsedAppearance;
        }
      }
    } catch (error) {
      console.error("Failed to load appearance from localStorage", error);
    }

    return {
      theme: "standard dark",
      outline: false,
    };
  });
  const [screenSaver, setScreenSaver] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialStaticState);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!mounted) return;

    const existingIcons = document.querySelectorAll(
      'link[rel="icon"], link[rel="shortcut icon"]'
    );
    existingIcons.forEach((icon) => {
      if (icon.parentNode) {
        icon.parentNode.removeChild(icon);
      }
    });
  }, [mounted]);

  useEffect(() => {
    const savedCubeData = initializer(initialStaticState, setMounted);
    dispatch({ type: "INITIALIZE", payload: savedCubeData });
  }, []);

  useEffect(() => {
    localStorage.setItem("cubeSettings", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem("appearance", JSON.stringify(appearance));
  }, [appearance]);

  if (!mounted) {
    return null;
  }

  return (
    <AppearanceContext.Provider value={{ appearance, setAppearance }}>
      <ThemeWrapper>
        <ScreenSaverContext.Provider value={{ screenSaver, setScreenSaver }}>
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              {children}
            </DispatchContext.Provider>
          </StateContext.Provider>
        </ScreenSaverContext.Provider>
      </ThemeWrapper>
    </AppearanceContext.Provider>
  );
};
