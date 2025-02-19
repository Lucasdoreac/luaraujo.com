/** @type {import('next').NextConfig} */
const basePath = '/luaraujo.com'

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}