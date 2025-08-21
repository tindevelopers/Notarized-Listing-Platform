/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  // Fix dev overlay issues
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce bundle splitting to prevent chunking issues
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          default: false,
          vendors: false,
        },
      };
    }
    return config;
  },
  // Improve compilation performance
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react'],
    turbo: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  },
  // Disable telemetry to reduce overhead
  telemetry: false,
};

export default nextConfig;
