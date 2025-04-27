import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging.keycloak.dreamemirates.com",
        pathname: "/api/v1/media-svc/image/get-presigned-url/**",
      },
    ],
  },
};

module.exports = nextConfig;
