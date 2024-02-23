import { analytics } from "@/utils/analytics";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const auth = headers().get("Authorization");

  if (auth !== process.env.API_SECRET) {
    console.error("Unauthorized request to /api/track");
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { namespace, event, opts } = await req.json();

  if (typeof namespace === "string" && typeof event === "object") {
    try {
      await analytics.track(namespace, event, opts);
    } catch (error) {
      console.error(error);
    }
  }

  return Response.json({});
}
