/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/luaraujo.com',
  assetPrefix: '/luaraujo.com/',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig