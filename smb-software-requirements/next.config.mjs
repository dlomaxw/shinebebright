/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  }
}

export default nextConfig
