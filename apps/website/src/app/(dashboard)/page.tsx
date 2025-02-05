"use client";
import Link from "next/link";

import useSWR from "swr";
import { getAccountInformation } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, UserMinus } from "lucide-react";

import { popupCenter } from "@/lib/utils";

export default function Home() {
  const user = useSWR("user", getAccountInformation);

  return (
    <main className="flex flex-col gap-2 min-h-screen justify-center items-center font-geist-sans">
      <p>hi and wait til this thing works (under construction fr fr)</p>

      <div className="flex gap-2">
        {user.data && !user.isValidating ? (
          <>
            <Button className="flex gap-2" size="sm" asChild>
              <Link href="/auth/logout">
                <UserMinus /> Logout
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                popupCenter({
                  url: `/auth/popup/github`,
                  title: "Github Auth",
                  w: 500,
                  h: 600,
                  window: window,
                });
              }}
              disabled={user.data.user.github !== null}
            >
              <Github /> Connect to Github
            </Button>
          </>
        ) : (
          <>
            <Button className="flex gap-2" size="sm" asChild>
              <Skeleton className="w-20" />
            </Button>
            <Button className="flex gap-2" size="sm" asChild>
              <Skeleton className="w-32" />
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
