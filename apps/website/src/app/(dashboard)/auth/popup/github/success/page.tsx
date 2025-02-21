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
        {user.data?.session.user.image ? (
          <>
            <Separator className="w-[2px] h-[1rem]" orientation="vertical" />
            <Image
              src={user.data?.session.user.image}
              alt="Discord User Avatar"
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
            <Separator className="w-[2px] h-[1rem]" orientation="vertical" />
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </>
        )}
      </div>
      <Card className="mx-4">
        <CardHeader>
          <CardTitle className="flex text-xl justify-center">
            Github has been Verified!
          </CardTitle>
          <CardDescription className="text-center text-sm md:text-sm">
            Please check your email and join the Github organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 flex-col items-center">
          <Button onClick={() => window.close()} className="w-full relative">
            Close Window
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
