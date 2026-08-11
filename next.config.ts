import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clarky3d.com",
      },
    ],
  },
  async headers() {
    const headers = Object.entries(securityHeaders()).map(([key, value]) => ({
      key,
      value,
    }));
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
