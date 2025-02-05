"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";

export default function Auth() {
  return (
    <main className="bg-spc-1">
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card>
          <CardHeader>
            <div className="flex justify-center">
              {/*
              <Image
                src="/static/images/spacecraft-logo/spacecraft-512.png"
                alt="logo"
                width={64}
                height={64}
                className="mb-1 rounded-md"
              />
              */}
              <span className="h-16 w-16 mb-1 rounded-md animate-pulse bg-slate-200"></span>
            </div>
            <CardTitle className="text-center">congrats!1!!! 🎉🎉🎉</CardTitle>
            <CardDescription className="text-center">
              your accoutn has been registered!1
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => window.close()}>
              Close Window
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
