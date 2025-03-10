import { signIn } from "@/lib/auth";

import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return signIn(
    "discord",
    {
      redirectTo: "/auth/popup/success",
    },
    { scope: "identify" }
  );
}
