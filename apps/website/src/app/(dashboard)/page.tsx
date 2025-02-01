import { Button } from "@/components/ui/button";
import { UserMinus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 min-h-screen justify-center items-center font-geist-sans">
      <p>hi and wait til this thing works (under construction fr fr)</p>
      <Button className="flex gap-2" size="sm" asChild>
        <Link href="/auth/logout">
          <UserMinus /> Logout
        </Link>
      </Button>
    </main>
  );
}
