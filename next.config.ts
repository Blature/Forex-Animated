import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow teammates on the local network to load dev resources (HMR, etc.)
  // without the cross-origin block. Add each machine's LAN IP that will open
  // the dev server. localhost is always allowed.
  allowedDevOrigins: ["192.168.1.111", "192.168.3.20"],
};

export default nextConfig;
