/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/branch-service/:path*',
        destination: process.env.NEXT_PUBLIC_BRANCH_SERVICE + '/:path*', // Proxy to Backend
      },
      {
        source: '/staff-service/:path*',
        destination: process.env.NEXT_PUBLIC_STAFF_SERVICE + '/:path*', // Proxy to Backend
      },
      {
        source: '/account-service/:path*',
        destination: process.env.NEXT_PUBLIC_ACCOUNT_SERVICE + '/:path*', // Proxy to Backend
      },
      {
        source: '/bpel-branch-service/:path*',
        destination: process.env.NEXT_PUBLIC_BPEL_BRANCH_SERVICE + '/:path*', // Proxy to Backend
      },
      {
        source: '/bpel-account-service/:path*',
        destination: process.env.NEXT_PUBLIC_BPEL_ACCOUNT_SERVICE + '/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
