/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/service/:path*',
        destination: 'http://localhost:14000/api/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
