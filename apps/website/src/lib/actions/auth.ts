"use server";

import { cookies } from "next/headers";

import { ExtendedUser } from "../types/user";

import { createClient } from "@/lib/supabase/server";
import { createServiceServer } from "@/lib/supabase/service-server";

export async function getAccountInformation(): Promise<ExtendedUser | false> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const _supabase = createServiceServer();

  const account = await supabase.auth.getUser();
  if (!account.data.user) return false;

  const user = await _supabase
    .from("users")
    .select("*")
    .eq("id", account.data.user.id)
    .single();
  if (!user.data) return false;

  return { account: account.data.user, user: user.data };
}
