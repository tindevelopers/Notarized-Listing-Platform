/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "api.builder.io"],
  },
  // Improve development experience
  experimental: {
    // Enable faster refresh
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Better error handling in development
  onDemandEntries: {
    // Keep pages in memory for 25 seconds
    maxInactiveAge: 25 * 1000,
    // Keep at most 25 pages in memory at the same time
    pagesBufferLength: 25,
  },
  // Improve webpack configuration for development
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Improve hot reload stability
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**"],
      };

      // Better source maps for debugging
      config.devtool = "eval-source-map";

      // Reduce memory usage during development
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      };
    }

    // Handle potential module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    return config;
  },
  // Headers for better development experience
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "no-cache, no-store, must-revalidate",
            },
          ],
        },
      ];
    }
    return [];
  },
  // Better error reporting
  typescript: {
    // Don't fail build on type errors in development
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
  eslint: {
    // Don't fail build on lint errors in development
    ignoreDuringBuilds: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
