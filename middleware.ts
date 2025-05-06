import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Extract hostname and sanitize
  const hostname = request.headers.get("host") || "";
  const domain = hostname.replace(/^www\./, "");

  console.log({ hostname, domain });

  try {
    const res = await fetch(
      // `https://backend.staging.identity.dreamemirates.com/api/websites?filter=[[["domain.name","eq","${domain}"]]]&page=1&length=10`,
      `${process.env.NEXT_PUBLIC_API_URL}/websites?filter=[[["domain.name","eq","${domain}"]]]&page=1&length=10`
    );

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
      const websiteDomain = websiteData?.domain?.name;

      console.log({ websiteId });
      console.log({ websiteDomain });

      if (websiteId && websiteDomain) {
        // Set cookies for websiteId and websiteDomain
        console.log({ websiteId });
        console.log({ websiteDomain });

        const response = NextResponse.next();
        response.cookies.set("websiteId", String(websiteId), {
          path: "/",
          httpOnly: false, // frontend needs to access it
          maxAge: 60 * 60 * 24, // 1 day
        });
        response.cookies.set("websiteDomain", String(websiteDomain), {
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
