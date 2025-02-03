export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_KEY: string;

      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;

      ORIGIN_URL: string;
    }
  }
}
