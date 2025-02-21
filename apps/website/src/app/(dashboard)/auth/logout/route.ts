import { signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";
const origin = process.env.ORIGIN_URL;

export async function GET(request: Request) {
  try {
    await signOut();

    return Response.redirect(`${origin}/?message=log-out`);
  } catch (err) {
    return Response.json({ success: false, message: err });
  }
}
