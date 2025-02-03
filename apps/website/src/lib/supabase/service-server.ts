import { Database as PublicDatabase } from "@devcreates/types/database";
import { Database as PrivateDatabase } from "@devcreates/types/schema/private/database";
import { createClient } from "@supabase/supabase-js";

/**
 * WARNING: DON'T USE THIS ON CLIENT COMPONENTS
 */
export const createServiceServer = () => {
  return createClient<PublicDatabase & PrivateDatabase>(
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
