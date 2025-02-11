export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_KEY: string;

      GITHUB_AUTH_CLIENT_ID: string;
      GITHUB_AUTH_CLIENT_SECRET: string;
      GITHUB_API_KEY: string;

      AUTH_SECRET: string;
      AUTH_DISCORD_ID: string;
      AUTH_DISCORD_SECRET: string;

      ORIGIN_URL: string;
    }
  }
}
