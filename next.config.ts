
const nextConfig = {
  images: {
    domains: [],
  },
  
  // Add assetPrefix if deploying to subpath
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}
export default nextConfig;
