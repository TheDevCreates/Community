import { Octokit } from "@octokit/core";

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
        client_id: process.env.GITHUB_AUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
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

  // Check if the user is already a member of the GitHub organization
  const octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY,
  });

  const orgMembership = await octokit
    .request("GET /orgs/{org}/memberships/{username}", {
      org: "TheDevCreates-Public",
      username: ghUser.login,
    })
    .catch(() => null);

  if (!orgMembership || orgMembership.data.state !== "active") {
    // Invite the user to the GitHub organization
    await octokit.request("POST /orgs/{org}/invitations", {
      org: "TheDevCreates-Public",
      invitee_id: ghUser.id,
      role: "direct_member",
    });
  } else {
    // Add search parameter if the user is already a member
    nextUrl.searchParams.set("github_invite", "already_on_org");
  }

  // Redirect to the success page
  nextUrl.pathname = "/auth/popup/success";

  return NextResponse.redirect(nextUrl);
}
