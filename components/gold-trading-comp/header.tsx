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
  return (
    <header className="container bg-[#12132d]/5 backdrop-blur-sm border-b rounded-2xl border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)]">
      <div className="mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-16 h-16 relative rounded-full overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={logo || "/avatar-default.png"}
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
