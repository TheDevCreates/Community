"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ExtendedUser } from "@/lib/types/user";
import { getAccountInformation } from "@/lib/actions/auth";

import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

function popupCenter({ url, title, w, h, window }: any) {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
  );

  if (window.focus) newWindow.focus();
}
