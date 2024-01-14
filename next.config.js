/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ['projectkeita.blob.core.windows.net'],
  },
}

module.exports = nextConfig
