"use server";

import { cookies } from "next/headers";

import { auth } from "@/lib/auth";
import { createServiceServer } from "@/lib/supabase/service-server";

export async function getAccountInformation() {
  const cookieStore = cookies();
  const supabase = createServiceServer();

  const session = await auth();
  if (!session) return false;

  const { data: github } = await supabase
    .from("github_connection")
    .select("*")
    .eq("id", session.user.id!)
    .single();

  return { session, github };
}
