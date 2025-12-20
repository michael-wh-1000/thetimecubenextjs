import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { Provider } from "@/lib/providers";
import { fetchUserData } from "@/lib/server";
import {
  AppearanceType,
  getClosestDuration,
  initialTimeCube,
  SessionType,
  staticState,
} from "@/lib/types";
import { themes } from "@/themeContent/themes";

export default async function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { storedState, storedAppearance } = await serverDataInitializer(
    session
  );

  return (
    <Provider
      initialSession={session}
      initialStoredState={storedState}
      initialSavedAppearance={storedAppearance}
    >
      {children}
    </Provider>
  );
}

const serverDataInitializer = async (session: SessionType) => {
  const retrievedData: {
    storedState: null | staticState;
    storedAppearance: null | AppearanceType;
  } = {
    storedState: null,
    storedAppearance: null,
  };

  if (session) {
    try {
      const { storedState, savedAppearance } = await fetchUserData(session);

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
      return retrievedData;
    }
  } else {
    return retrievedData;
  }
};
