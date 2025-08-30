/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desabilitar SSR para componentes que usam browser APIs
  experimental: {
    esmExternals: 'loose',
  },
  
  // Configurações de segurança para resolver warnings
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },

  // Configurações para melhorar a performance
  swcMinify: true,
  
  // Configurações de webpack para resolver problemas de módulos
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
