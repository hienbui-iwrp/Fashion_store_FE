/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/admin-bff/:path*',
        destination: process.env.NEXT_PUBLIC_ADMIN_BFF + '/:path*', // Proxy to Backend
      },
      {
        source: '/customer-bff/:path*',
        destination: process.env.NEXT_PUBLIC_CUSTOMER_BFF + '/:path*', // Proxy to Backend
      },
      {
        source: '/share-bff/check-warehouse',
        destination: process.env.NEXT_PUBLIC_BPEL_CHECK_WAREHOUSE_SERVICE, // Proxy to Backend
      },
      {
        source: '/share-bff/:path*',
        destination: process.env.NEXT_PUBLIC_SHARE_BFF + '/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
