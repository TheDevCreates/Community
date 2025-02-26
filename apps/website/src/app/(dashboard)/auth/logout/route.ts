import { signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await signOut({ redirect: false });

    return Response.redirect(
      `${process.env.ORIGIN_URL ?? "http://localhost:3000"}`
    );
  } catch (err) {
    return Response.json({ success: false, message: err });
  }
}
