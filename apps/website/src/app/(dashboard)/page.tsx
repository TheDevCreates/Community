"use client";
import Image from "next/image";

import useSWR from "swr";
import { getAccountInformation } from "@/lib/actions/auth";

import { SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";
import { Check, LogOut, SquareArrowOutUpRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { signOut } from "next-auth/react";
import { cn, popupCenter } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const user = useSWR("user", getAccountInformation);

  if (typeof user.data === "boolean") return <>Something went wrong.</>;

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
        <Separator className="w-[2px] h-[1rem]" orientation="vertical" />
        {user.data?.session.user.image ? (
          <>
            <Image
              src={user.data?.session.user.image}
              alt="User Avatar"
              width={28}
              height={28}
              className="rounded-full"
            />
            <p className="md:text-lg font-medium">
              {user.data?.session.user.name}
            </p>
          </>
        ) : (
          <>
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </>
        )}
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
        <CardContent className="mt-2 flex gap-2 flex-col items-center">
          <Button
            onClick={() => {
              popupCenter({
                url: `/auth/popup/github`,
                title: "Github Auth",
                w: 500,
                h: 600,
                window: window,
              });
            }}
            className="w-full relative"
            disabled={!(user.data?.session && !user.data?.github)}
          >
            <SiGithub fill={SiGithubHex} />
            Login with Github
            {user.data?.github && <Check className="absolute right-2" />}
          </Button>
          <div className="grid gap-2 grid-cols-2 w-full">
            <Link
              href="https://github.com/TheDevCreates-Public"
              target="_blank"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <SquareArrowOutUpRight />
              Github Organization
            </Link>
            <Button
              onClick={() => signOut()}
              variant="destructive"
              className={cn("w-full")}
            >
              <LogOut />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
