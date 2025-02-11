import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string;
    user: {
      // The user's postal address
      address: string;
    } & DefaultSession["user"];
  }
}
