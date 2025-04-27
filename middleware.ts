import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const existingWebsiteId = request.cookies.get("websiteId")?.value;

  // Reuse cookie if already exists
  // if (existingWebsiteId) {
  //   return NextResponse.next();
  // }

  // Extract hostname and sanitize
  const hostname = request.headers.get("host") || "";
  const domain = hostname.replace(/^www\./, "");

  try {
    const res = await fetch(
      // `https://backend.staging.identity.dreamemirates.com/api/domain/info?name=${domain}`
      `https://backend.staging.identity.dreamemirates.com/api/websites?filter=[[["domain.name","eq","${domain}"]]]&page=1&length=10`
    );

    // `https://backend.staging.identity.dreamemirates.com/api/domain/info?name=taghyeer.ai`;

    const result = await res.json();

    console.log(result, "response from backend");

    // Check if success is true and data array has at least one item
    if (
      result?.success &&
      Array.isArray(result?.data) &&
      result.data.length > 0
    ) {
      const websiteData = result.data[0];
      const websiteId = websiteData.id;

      if (websiteId) {
        console.log({ websiteId });

        const response = NextResponse.next();
        response.cookies.set("websiteId", String(websiteId), {
          path: "/",
          httpOnly: false, // frontend needs to access it
          maxAge: 60 * 60 * 24, // 1 day
        });
        return response;
      }
    }
  } catch (e) {
    console.error("Error in middleware:", e);
  }

  return NextResponse.next();
}
