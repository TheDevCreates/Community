"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getAccountInformation } from "@/lib/actions/auth";

import { SiDiscord, SiDiscordHex } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { popupCenter } from "@/lib/utils";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("focus", async (e) => {
      e.preventDefault();

      router.refresh();
    });

    getAccountInformation().then((data) => {
      if (data.valueOf() === Object) router.replace("/");
      setIsLoggedIn(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 [div>transition]">
      <div className="flex gap-3 justify-center items-center">
        <Image
          src="/static/images/devcreates.png"
          alt="DevCreates Logo"
          width={40}
          height={40}
          className="size-8 md:size-10"
        />
        <p className="md:text-lg font-medium">DevCreates</p>
      </div>
      <Card className="mx-4">
        <CardHeader>
          <CardTitle className="flex text-xl justify-center">
            DevCreates Community
          </CardTitle>
          <CardDescription className="text-center text-sm md:text-sm">
            A GitHub community where developers can collaborate on projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2 flex flex-col items-center">
          <Button
            onClick={(e) => {
              e.preventDefault();

              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              isLoggedIn
                ? router.replace("/")
                : popupCenter({
                    url: `/auth/popup/discord`,
                    title: "Discord Auth",
                    w: 500,
                    h: 600,
                    window: window,
                  });
            }}
            className="w-full"
          >
            <SiDiscord fill={SiDiscordHex} />
            Login with Discord
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
