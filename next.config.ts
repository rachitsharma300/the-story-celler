import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    resolveAlias: {
      canvas: "./lib/empty-mock.ts",
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
