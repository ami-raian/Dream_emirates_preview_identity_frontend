import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "staging.keycloak.dreamemirates.com",
      "dream-emirates-stage.s3.ap-south-1.amazonaws.com",
    ],
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
