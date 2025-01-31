"use server";

import { cookies } from "next/headers";

import { type User as SupabaseUser } from "@supabase/supabase-js";
import type User from "@devcreates/types/schema/public/users";

import { createClient } from "@/lib/supabase/server";
import { createServiceServer } from "@/lib/supabase/service-server";

export async function getAccountInformation(): Promise<{
  account: SupabaseUser;
  user: User;
} | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const _supabase = createServiceServer();

  const account = await supabase.auth.getUser();
  if (!account.data.user) return null;

  const user = await _supabase
    .from("users")
    .select("*")
    .eq("id", account.data.user.id)
    .single();
  if (!user.data) return null;

  return { account: account.data.user, user: user.data };
}
