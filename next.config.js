/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/luaraujo.com',
  assetPrefix: '/luaraujo.com/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Adiciona rewrite para o HTML gerado
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
    ]
  },
}