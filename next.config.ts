/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // (optional) lets build succeed even with TS errors
  },
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
