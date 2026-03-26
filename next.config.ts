import type { NextConfig } from "next";

const ignoredWorkspaceGlobs = [
  "**/lab-media/**",
  "**/paper-images/**",
  "**/paper-page-shots/**",
  "**/release/**",
  "**/tmp/**",
];

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  poweredByHeader: false,
  compress: true,
  outputFileTracingExcludes: {
    "/*": ignoredWorkspaceGlobs,
  },
  webpack(config, { dev }) {
    if (dev) {
      const currentIgnored = config.watchOptions?.ignored;

      if (Array.isArray(currentIgnored)) {
        config.watchOptions = {
          ...config.watchOptions,
          ignored: [...currentIgnored, ...ignoredWorkspaceGlobs],
        };
      } else {
        config.watchOptions = {
          ...config.watchOptions,
          ignored: ignoredWorkspaceGlobs,
        };
      }
    }

    return config;
  },
};

export default nextConfig;
