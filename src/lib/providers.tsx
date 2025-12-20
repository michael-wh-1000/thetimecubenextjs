"use client";

import {
  createContext,
  useState,
  useEffect,
  useReducer,
  ActionDispatch,
} from "react";
import { themes } from "../themeContent/themes";
import ThemeWrapper from "@/themeContent/themewrapper";
import {
  Action,
  AppearanceAction,
  AppearanceType,
  getClosestDuration,
  initialTimeCube,
  ScreenSaverContextType,
  SessionType,
  staticState,
} from "./types";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "./auth-client";
import { fetchUserData } from "./server";
import { Toaster } from "sonner";
import Loading from "@/components/reusable/loading";

export const ScreenSaverContext = createContext<ScreenSaverContextType | null>(
  null
);

export const AppearanceContext = createContext<{
  appearance: AppearanceType;
  appearanceDispatch: ActionDispatch<[action: AppearanceAction]>;
} | null>(null);

export const StateContext = createContext<staticState | null>(null);

export const SessionContext = createContext<SessionType>(null);

export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export const formatTypes = ["day", "week", "month", "year", "life", "custom"];

const initializer = async (
  initialValue: staticState,
  initialAppearance: AppearanceType,
  session: SessionType
) => {
  const retrievedData = {
    storedState: initialValue,
    storedAppearance: initialAppearance,
  };
  if (session) {
    try {
      const { storedState, savedAppearance } = await fetchUserData();

      if (storedState) {
        retrievedData.storedState = storedState.map((storedStateItem) => {
          return {
            id: storedStateItem.id,
            name: storedStateItem.name,
            format: storedStateItem.format,
            cubeSize: initialTimeCube.cubeSize,
            totalYears: Number(storedStateItem.totalYears),
            passedYears: Number(storedStateItem.passedYears),
            endDate: initialTimeCube.endDate,
            initialDate: initialTimeCube.initialDate,
            cubeDuration: getClosestDuration(
              Number(storedStateItem.cubeDuration)
            ).value,
            initialCustomDate: new Date(storedStateItem.initialCustomDate),
            endCustomDate: new Date(storedStateItem.endCustomDate),
            birthDate: storedStateItem.birthDate
              ? new Date(storedStateItem.birthDate)
              : new Date(
                  new Date().getFullYear() - storedStateItem.passedYears,
                  new Date().getMonth(),
                  new Date().getDate()
                ),
            deathDate: storedStateItem.deathDate
              ? new Date(storedStateItem.deathDate)
              : new Date(
                  new Date().getFullYear() -
                    storedStateItem.passedYears +
                    storedStateItem.totalYears,
                  new Date().getMonth(),
                  new Date().getDate()
                ),
            totalCubes: initialTimeCube.totalCubes,
            createdAt: storedStateItem.createdAt,
          };
        });
      }
      if (savedAppearance) {
        const savedTheme = savedAppearance.theme;

        if (themes[savedTheme]) {
          retrievedData.storedAppearance = savedAppearance;
        }
      }
      return retrievedData;
    } catch (error) {
      console.error("Failed to load data", error);
    }
  } else {
    try {
      const storedState = localStorage.getItem("cubeSettings");
      const savedAppearance = localStorage.getItem("appearance");
      const cubeTutorial = localStorage.getItem("cubeTutorial");
      const dashboardTutorial = localStorage.getItem("dashboardTutorial");

      if (storedState) {
        const parsedState: staticState = JSON.parse(storedState);
        retrievedData.storedState = parsedState.map((parsedStateItem) => {
          return {
            id: parsedStateItem.id,
            name: parsedStateItem.name,
            format: parsedStateItem.format,
            cubeSize: Number(parsedStateItem.cubeSize),
            totalYears: Number(parsedStateItem.totalYears),
            passedYears: Number(parsedStateItem.passedYears),
            endDate: new Date(parsedStateItem.endDate),
            initialDate: new Date(parsedStateItem.initialDate),
            cubeDuration: getClosestDuration(
              Number(parsedStateItem.cubeDuration)
            ).value,
            initialCustomDate: new Date(parsedStateItem.initialCustomDate),
            endCustomDate: new Date(parsedStateItem.endCustomDate),
            birthDate: parsedStateItem.birthDate
              ? new Date(parsedStateItem.birthDate)
              : new Date(
                  new Date().getFullYear() - parsedStateItem.passedYears,
                  new Date().getMonth(),
                  new Date().getDate()
                ),
            deathDate: parsedStateItem.deathDate
              ? new Date(parsedStateItem.deathDate)
              : new Date(
                  new Date().getFullYear() -
                    parsedStateItem.passedYears +
                    parsedStateItem.totalYears,
                  new Date().getMonth(),
                  new Date().getDate()
                ),
            totalCubes: Number(parsedStateItem.totalCubes),
            createdAt: parsedStateItem.createdAt
              ? new Date(parsedStateItem.createdAt)
              : new Date(),
          };
        });
      }

      if (savedAppearance) {
        const parsedAppearance: AppearanceType = JSON.parse(savedAppearance);
        const savedTheme = parsedAppearance.theme;

        if (themes[savedTheme]) {
          if (cubeTutorial && dashboardTutorial) {
            retrievedData.storedAppearance = {
              ...parsedAppearance,
              cubeTutorial: JSON.parse(cubeTutorial),
              dashboardTutorial: JSON.parse(dashboardTutorial),
            };
          } else {
            retrievedData.storedAppearance = parsedAppearance;
          }
        }
      }
      return retrievedData;
    } catch (error) {
      console.error("Failed to load data", error);
    }
  }

  return retrievedData;
};

export const initialStaticState: staticState = [];

function reducer(
  state: staticState | null,
  action: Action
): staticState | null {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ADD":
      return state
        ? [...state, action.payload].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        : null;
    case "DELETE":
      return state
        ? state.filter((item) => item.id !== action.payload.id)
        : null;
    case "UPDATE":
      return state
        ? state.map((item) =>
            item.id == action.payload.id ? { ...item, ...action.payload } : item
          )
        : null;
    case "RESET":
      return action.payload;
    default:
      return state;
  }
}

function appearanceReducer(
  state: AppearanceType | null,
  action: AppearanceAction
): AppearanceType | null {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "UPDATE":
      return state ? { ...state, ...action.payload } : null;
    default:
      return state;
  }
}

const initialAppearance: AppearanceType = {
  theme: "standard dark",
  outline: false,
  cubeTutorial: false,
  dashboardTutorial: false,
};

const getSession = async () => {
  const res = await authClient.getSession();

  if (!res || !res.data) {
    return null;
  }

  return res.data;
};

export const Provider = ({
  children,
  initialSession,
  initialStoredState,
  initialSavedAppearance,
}: {
  children: React.ReactNode;
  initialSession: SessionType;
  initialStoredState: staticState | null;
  initialSavedAppearance: AppearanceType | null;
}) => {
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    initialData: initialSession,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    gcTime: 1000 * 60 * 60,
  });

  const [previousSession, setPreviousSession] =
    useState<SessionType>(initialSession);
  const [appearance, appearanceDispatch] = useReducer(
    appearanceReducer,
    initialSavedAppearance
  );
  const [screenSaver, setScreenSaver] = useState(false);
  const theme = appearance?.theme || "standard dark";
  const colors = themes[theme];

  const [state, dispatch] = useReducer(reducer, initialStoredState);

  useEffect(() => {
    let cancelled = false;

    const getSavedData = async () => {
      if (appearance && state) {
        setMounted(true);
      }
      if (session) {
        const sessionChanged = session?.user.id !== previousSession?.user.id;
        if (sessionChanged) {
          console.log("session changed");
          setPreviousSession(session);

          setMounted(false);

          const { storedState, storedAppearance } = await initializer(
            initialStaticState,
            initialAppearance,
            session
          );

          if (!cancelled) {
            appearanceDispatch({
              type: "INITIALIZE",
              payload: storedAppearance,
            });
            dispatch({ type: "INITIALIZE", payload: storedState });
          }
          setMounted(true);
        } else {
          setMounted(true);
        }
      } else {
        setMounted(false);

        const { storedState, storedAppearance } = await initializer(
          initialStaticState,
          initialAppearance,
          session
        );

        if (!cancelled) {
          appearanceDispatch({ type: "INITIALIZE", payload: storedAppearance });
          dispatch({ type: "INITIALIZE", payload: storedState });
        }
        setMounted(true);
      }
    };

    getSavedData();

    return () => {
      cancelled = true;
    };
  }, [session]);

  useEffect(() => {
    if (!session && !isPending) {
      localStorage.setItem("cubeSettings", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (!session && !isPending) {
      localStorage.setItem("appearance", JSON.stringify(appearance));
    }
  }, [appearance]);

  if (!appearance || !state || !mounted) {
    return <Loading />;
  }

  return (
    <SessionContext.Provider value={session}>
      <AppearanceContext.Provider value={{ appearance, appearanceDispatch }}>
        <ThemeWrapper>
          <ScreenSaverContext.Provider value={{ screenSaver, setScreenSaver }}>
            <StateContext.Provider value={state}>
              <DispatchContext.Provider value={dispatch}>
                <Toaster
                  toastOptions={{
                    style: {
                      background: colors.background,
                      borderColor: colors.foreground,
                      color: colors.textColor,
                    },
                  }}
                />
                {children}
              </DispatchContext.Provider>
            </StateContext.Provider>
          </ScreenSaverContext.Provider>
        </ThemeWrapper>
      </AppearanceContext.Provider>
    </SessionContext.Provider>
  );
};
