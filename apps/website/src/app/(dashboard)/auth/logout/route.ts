import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const origin = process.env.ORIGIN_URL;

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    await supabase.auth.signOut();

    return Response.redirect(`${origin}/?message=log-out`);
  } catch (err) {
    return Response.json({ success: false, message: err });
  }
}
