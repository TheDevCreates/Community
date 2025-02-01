import { type User as SupabaseUser } from "@supabase/supabase-js";
import type User from "@devcreates/types/schema/public/users";

export type ExtendedUser = {
  account: SupabaseUser;
  user: User;
};
