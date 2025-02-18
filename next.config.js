/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/luaraujo.com',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  // Ensure assets are prefixed correctly
  assetPrefix: process.env.NODE_ENV === 'production' ? '/luaraujo.com' : '',
}

module.exports = nextConfig