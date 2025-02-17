/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/luaraujo.com',
  assetPrefix: '/luaraujo.com/',
}

module.exports = nextConfig