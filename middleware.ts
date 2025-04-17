import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  //   const hostname = request.headers.get("host") || "";
  //   const domain = hostname.replace(/^www\./, ""); // remove www

  try {
    const res = await fetch(
      //   `https://backend.staging.identity.dreamemirates.com/api/domain/info?name=${domain}`
      `https://backend.staging.identity.dreamemirates.com/api/domain/info?name=taghyeer.ai`
    );

    const data = await res.json();

    if (data?.status && data?.data?.websiteId) {
      const websiteId = data.data.websiteId;

      const response = NextResponse.next();
      response.cookies.set("websiteId", String(websiteId), {
        path: "/",
        httpOnly: false, // make it accessible in browser if needed
      });
      return response;
    }
  } catch (e) {
    console.error("Error in middleware:", e);
  }

  return NextResponse.next();
}
