"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ExtendedUser } from "@/lib/types/user";
import { getAccountInformation } from "@/lib/actions/auth";

import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { popupCenter } from "@/lib/utils";

export default function LoginPage() {
  const [authData, setAuthData] = useState<ExtendedUser | boolean>(false);

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("focus", async (e) => {
      e.preventDefault();

      router.refresh();
    });

    getAccountInformation().then((data) => {
      if (data.valueOf() === Object) window.location.href = `/`;
      setAuthData(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen justify-center items-center">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col items-center">
            <Image
              src="/static/images/devcreates.png"
              alt="DevCreates"
              width={60}
              height={60}
              className="mb-2"
            />
          </div>
          <CardTitle className="flex justify-center">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!authData ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();

                popupCenter({
                  url: `/auth/popup/discord`,
                  title: "Discord Auth",
                  w: 500,
                  h: 600,
                  window: window,
                });
              }}
              className="w-full"
            >
              <SiDiscord /> Login with Discord
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
