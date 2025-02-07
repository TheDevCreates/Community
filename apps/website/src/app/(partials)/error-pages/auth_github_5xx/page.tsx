"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function GithubAuth5xx() {
  return (
    <Suspense>
      <ErrorPage />
    </Suspense>
  );
}

function ErrorPage() {
  const searchParams = useSearchParams();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p>500 - Internal Server Error</p>
      <p className="text-slate-300 text-xs">
        Error at Github Auth - {searchParams.get("error")}
      </p>
    </main>
  );
}
