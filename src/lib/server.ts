"use server";

import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import {
  AppearanceType,
  cubeNameSchema,
  emailSchema,
  lifeDurationSchema,
  SessionType,
  TimeCubeDataType,
} from "./types";
import { appearanceTable, timeCubes, waitlist } from "@/utils/db/schema";
import { db } from "@/utils/db/db";
import { and, eq } from "drizzle-orm";

export async function addCube(newTimeCube: TimeCubeDataType) {
  const result = cubeNameSchema.safeParse(newTimeCube.name.trim());

  if (result.success) {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (session) {
        const finalNewTimeCube: typeof timeCubes.$inferInsert = {
          id: newTimeCube.id,
          name: newTimeCube.name,
          format: newTimeCube.format,
          cubeDuration: newTimeCube.cubeDuration,
          passedYears: newTimeCube.passedYears,
          totalYears: newTimeCube.totalYears,
          initialCustomDate: newTimeCube.initialCustomDate,
          endCustomDate: newTimeCube.endCustomDate,
          birthDate: newTimeCube.birthDate,
          deathDate: newTimeCube.deathDate,
          userId: session.user.id,
          createdAt: newTimeCube.createdAt,
        };

        await db.insert(timeCubes).values(finalNewTimeCube);
      }
    } catch (error) {
      return { error: "Error creating cube" };
    }
  } else {
    return { error: "Error creating cube" };
  }
}

export async function deleteCube(deletedTimeCube: TimeCubeDataType) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      await db
        .delete(timeCubes)
        .where(
          and(
            eq(timeCubes.id, deletedTimeCube.id),
            eq(timeCubes.userId, session.user.id)
          )
        );
    }
  } catch (error) {
    return { error: "Error deleting cube" };
  }
}

export async function updateCube(
  payload: { id: string } & Partial<Omit<TimeCubeDataType, "id">>
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const { id, ...dataWithoutId } = payload;

    if (dataWithoutId.name) {
      const result = cubeNameSchema.safeParse(dataWithoutId.name.trim());
      if (!result.success) {
        throw new Error("Invalid name");
      }
    }

    if (dataWithoutId.passedYears) {
      const result = lifeDurationSchema.safeParse(dataWithoutId.passedYears);
      if (!result.success) {
        throw new Error("Invalid");
      }
    }

    if (dataWithoutId.totalYears) {
      const result = lifeDurationSchema.safeParse(dataWithoutId.totalYears);
      if (!result.success) {
        throw new Error("Invalid");
      }
    }

    if (session) {
      await db
        .update(timeCubes)
        .set(dataWithoutId)
        .where(
          and(eq(timeCubes.id, id), eq(timeCubes.userId, session.user.id))
        );
    }
  } catch (error) {
    return { error: "Error updating cube" };
  }
}

export async function updateAppearance(payload: Partial<AppearanceType>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      await db
        .update(appearanceTable)
        .set(payload)
        .where(eq(appearanceTable.userId, session.user.id));
    }
  } catch (error) {
    return { error: "Error updating appearance" };
  }
}

export async function fetchUserData(initialSession?: SessionType) {
  const session =
    initialSession ??
    (await auth.api.getSession({
      headers: await headers(),
    }));

  if (!session) {
    throw new Error("Not authenticated");
  }

  const [allTimeCubes, appearanceData] = await Promise.all([
    db
      .select({
        id: timeCubes.id,
        name: timeCubes.name,
        format: timeCubes.format,
        passedYears: timeCubes.passedYears,
        totalYears: timeCubes.totalYears,
        cubeDuration: timeCubes.cubeDuration,
        initialCustomDate: timeCubes.initialCustomDate,
        endCustomDate: timeCubes.endCustomDate,
        birthDate: timeCubes.birthDate,
        deathDate: timeCubes.deathDate,
        createdAt: timeCubes.createdAt,
      })
      .from(timeCubes)
      .where(eq(timeCubes.userId, session.user.id)),

    db
      .select({
        theme: appearanceTable.theme,
        outline: appearanceTable.outline,
        cubeTutorial: appearanceTable.cubeTutorial,
        dashboardTutorial: appearanceTable.dashboardTutorial,
      })
      .from(appearanceTable)
      .where(eq(appearanceTable.userId, session.user.id))
      .limit(1),
  ]);

  if (appearanceData.length < 1) {
    await db.insert(appearanceTable).values({ userId: session.user.id });

    return {
      storedState: allTimeCubes,
      savedAppearance: {
        theme: "standard dark",
        outline: false,
        cubeTutorial: false,
        dashboardTutorial: false,
      },
    };
  }

  return { storedState: allTimeCubes, savedAppearance: appearanceData[0] };
}

export async function addToWaitlist(email: string) {
  const trimmedEmail = email.trim();

  try {
    const result = emailSchema.safeParse(trimmedEmail);
    if (result.success) {
      await db.insert(waitlist).values({ email: trimmedEmail });
    } else {
      return { error: "Error adding to waitlist" };
    }
  } catch (error) {
    return { error: "Error adding to waitlist" };
  }
}
