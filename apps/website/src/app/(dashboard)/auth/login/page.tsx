"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ExtendedUser } from "@/lib/types/user";
import { getAccountInformation } from "@/lib/actions/auth";

import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
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
      {!authData ? (
        <Skeleton className="h-10 w-10 rounded-md" />
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
        >
          <SiDiscord /> Login with Discord
        </Button>
      )}
    </main>
  );
}
