// next.config.ts
const nextConfig = {
  images: {
    domains: [],
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint blocking builds
  },

  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

export default nextConfig
