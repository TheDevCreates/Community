import { nanoid } from "nanoid";

import { createClient } from "@/lib/supabase/server";
import { Database } from "@devcreates/types/schema/private/database";

import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GithubResponse =
  | {
      access_token: string;
      token_type: string;
      scope: string;
    }
  | {
      error: string;
      error_description: string;
      error_uri: string;
    };

export async function GET(request: NextRequest) {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const nextUrl = request.nextUrl.clone();
    nextUrl.pathname = "/auth";
    nextUrl.searchParams.set("required", "true");
    return NextResponse.redirect(nextUrl);
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const accessToken: GithubResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  ).then((res) => res.json());

  const nextUrl = request.nextUrl.clone();

  if ("error" in accessToken) {
    nextUrl.pathname = `/error-pages/auth_github_${accessToken.error === "bad_verification_code" ? "4" : "5"}xx`;
    nextUrl.searchParams.delete("code");
    nextUrl.searchParams.delete("state");
    nextUrl.searchParams.set("error", accessToken.error);
    return NextResponse.redirect(nextUrl);
  }

  const ghUser = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/json",
      Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
    },
  }).then((res) => res.json());

  await supabase
    .from("users")
    .update({ github: ghUser })
    .match({ id: user.id });

  nextUrl.pathname = "/auth/popup/success";

  return NextResponse.redirect(nextUrl);
}
