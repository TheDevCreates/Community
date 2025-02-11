import { Database } from "@devcreates/types/database";
import { createClient } from "@supabase/supabase-js";

import { SupabaseAdapter } from "@auth/supabase-adapter";

/**
 * WARNING: DON'T USE THIS ON CLIENT COMPONENTS
 */
export const createServiceServer = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

export const adapter = SupabaseAdapter({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  secret: process.env.SUPABASE_SERVICE_KEY,
});
