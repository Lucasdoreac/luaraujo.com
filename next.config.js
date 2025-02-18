/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/luaraujo.com',
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Adiciona trailing slash para evitar problemas de roteamento
  trailingSlash: true,
  // Configuração para assets estáticos
  assetPrefix: '/luaraujo.com'
}