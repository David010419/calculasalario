import { ADSENSE_CLIENT } from "@/lib/site";

export const dynamic = "force-static";

/** ads.txt que exige AdSense; se genera a partir del identificador de editor. */
export function GET() {
  if (!ADSENSE_CLIENT) return new Response("", { status: 404 });
  const publisher = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
