"use client";

import Image from "next/image";
import { Clock } from "./clock";

export function Header({
  websiteName,
  logo,
}: {
  websiteName: string;
  logo: string;
}) {
  console.log({ websiteName, logo });
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL2}/media-svc/image/get-presigned-url/${logo}`;
  console.log({ imageUrl });
  return (
    <header className="container bg-[#12132d]/5 backdrop-blur-sm border-b rounded-2xl border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)]">
      <div className="mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-16 h-16 relative rounded-full overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL2}/media-svc/image/get-presigned-url/${logo}`}
                // src={`https://staging.keycloak.dreamemirates.com/api/v1/media-svc/image/get-presigned-url/c6daf982-f7c7-41c4-bf75-3fdd99e39b6e.jpg`}
                alt="Website Logo"
                fill
                className="object-contain"
              />
            </div>

            {/* Website Name */}
            <div className="text-white text-xl font-medium">
              {websiteName?.length > 0 ? websiteName : "No Name"}
            </div>
          </div>

          {/* Clock */}
          <Clock />
        </div>
      </div>
    </header>
  );
}
