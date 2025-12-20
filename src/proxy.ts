import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (session) {
      const force = request.nextUrl.searchParams.get("force");

      if (force === "true") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  if (pathname === "/app/profile") {
    if (!session) {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  return NextResponse.next();
}
