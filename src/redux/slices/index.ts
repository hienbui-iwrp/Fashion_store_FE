export * from './notificationSlice'

import { navbarSlice } from './navbarSlice'
import { notificationSlice } from './notificationSlice'
import { userSlice } from './user'
import {productsSlice } from './products'

const navbarActions = navbarSlice.actions
const userActions = userSlice.actions
const notificationActions = notificationSlice.actions
const productsActions = productsSlice.actions

export {
  navbarSlice,
  navbarActions,
  userSlice,
  userActions,
  notificationActions,
  notificationSlice,
  productsActions,
  productsSlice
}
