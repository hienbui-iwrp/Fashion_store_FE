export const BASE_URL = 'http://localhost:3000'
export const HOST_BRANCH_SERVICE = 'http://localhost:3000/branch-service'
export const HOST_STAFF_SERVICE = 'http://localhost:3000/staff-service'

export const Routes = {
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  error: '/404',
  homepage: '/',
  products: '/products',
  manageOrders: '/manage-orders',
  manageOrdersDetail: '/manage-orders/',
  productsDetail: '/products/',
  intro: '/intro',
  cart: '/cart',
  payment: '/payment',
  userInfo: '/user-info',
  man: '/man',
  woman: '/woman',
  baby: '/baby',
  accessory: '/accessory',
  support: '/support',
  admin: {
    homepage: '/admin/',
    branch: '/admin/branch',
    branchDetail: '/admin/branch/detail',
    statistic: '/admin/statistic',
    staff: '/admin/staff',
    staffDetail: '/admin/staff/detail',
    staffRequest: '/admin/staff/request',
    account: '/admin/account',
    accountDetail: '/admin/account/detail',
    event: '/admin/event',
    eventDetail: '/admin/event/detail',
    goods: '/admin/goods',
    goodsDetail: '/admin/goods/detail',
    warehouse: '/admin/warehouse',
    order: '/admin/order',
    orderDetail: '/admin/order/detail',
    orderOnline: '/admin/order/online',
  },
}
