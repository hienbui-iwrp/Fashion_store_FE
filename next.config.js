const isProcessOrderBefore = false;
const isProductDetailAfter = true;
const isProductDefaultAfter = true;
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
        source: '/customer-bff/create-order',
        destination: isProcessOrderBefore ? process.env.NEXT_PUBLIC_BPEL_CREATE_ORDER : process.env.NEXT_PUBLIC_BPEL_CREATE_ORDER_AFTER, // Proxy to Backend
      },
      {
        source: '/payment/vn-pay',
        destination: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', // Proxy to Backend
      },
      {
        source: '/customer-bff/:path*',
        destination: process.env.NEXT_PUBLIC_CUSTOMER_BFF + '/:path*', // Proxy to Backend
      },
      {
        source: '/share-bff/check-warehouse',
        destination: isProcessOrderBefore ? process.env.NEXT_PUBLIC_BPEL_CHECK_WAREHOUSE_SERVICE : process.env.NEXT_PUBLIC_BPEL_CHECK_WAREHOUSE_SERVICE_AFTER, // Proxy to Backend
      },
      {
        source: '/share-bff/products-default',
        destination: isProductDefaultAfter ? process.env.NEXT_PUBLIC_BPEL_PRODUCTS_DEFAULT : process.env.NEXT_PUBLIC_BPEL_PRODUCTS_DEFAULT_BEFORE, // Proxy to Backend
      },
      {
        source: '/share-bff/products-detail',
        destination: isProductDetailAfter ? process.env.NEXT_PUBLIC_BPEL_PRODUCTS_DETAIL : process.env.NEXT_PUBLIC_BPEL_PRODUCTS_DETAIL_BEFORE, // Proxy to Backend
      },
      {
        source: '/share-bff/:path*',
        destination: process.env.NEXT_PUBLIC_SHARE_BFF + '/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
