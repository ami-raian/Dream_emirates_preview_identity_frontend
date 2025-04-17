import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const existingWebsiteId = request.cookies.get("websiteId")?.value;

  // ✅ Reuse cookie if already exists
  if (existingWebsiteId) {
    return NextResponse.next();
  }

  // Extract hostname and sanitize
  const hostname = request.headers.get("host") || "";
  const domain = hostname.replace(/^www\./, "");

  try {
    const res = await fetch(
      `https://backend.staging.identity.dreamemirates.com/api/domain/info?name=${domain}`
    );

    // `https://backend.staging.identity.dreamemirates.com/api/domain/info?name=taghyeer.ai`;

    const data = await res.json();

    if (data?.status && data?.data?.websiteId) {
      const websiteId = data.data.websiteId;

      const response = NextResponse.next();
      response.cookies.set("websiteId", String(websiteId), {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 24, // 1 day
      });
      return response;
    }
  } catch (e) {
    console.error("Error in middleware:", e);
  }

  return NextResponse.next();
}
