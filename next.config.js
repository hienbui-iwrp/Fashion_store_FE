/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/branch-service/:path*',
        destination: 'http://localhost:14000/api/branch-service/:path*', // Proxy to Backend
      },
      {
        source: '/staff-service/:path*',
        destination: 'http://localhost:14082/api/staff-service/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
