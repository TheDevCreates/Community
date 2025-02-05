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

      ORIGIN_URL: string;
    }
  }
}
