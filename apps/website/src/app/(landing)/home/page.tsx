import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SiDiscord, SiDiscordHex } from "@icons-pack/react-simple-icons";

export default function Home() {
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0} className="w-full">
                  <Button disabled className="w-full">
                    <SiDiscord fill={SiDiscordHex} />
                    Login with Discord
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent className="text-medium text-black text-sm">
                <p>🏗️🚧 Coming Soon! 🚧🚧</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </main>
  );
}
