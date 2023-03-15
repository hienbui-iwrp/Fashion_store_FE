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
      {
        source: '/account-service/:path*',
        destination: 'http://localhost:14083/api/account-service/:path*', // Proxy to Backend
      },
      {
        source: '/bpel-branch-service',
        destination: 'http://PhongTran:7001/soa-infra/services/default/callBranchService/callbranchservice_client_ep?WSDL', // Proxy to Backend
      },
      {
        source: '/bpel-account-service',
        destination: 'http://PhongTran:7001/soa-infra/services/default/callAccountService/accountservice_client?WSDL', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
