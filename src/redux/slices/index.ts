export * from './notificationSlice'

import { navbarSlice } from './navbarSlice'
import { notificationSlice } from './notificationSlice'
import { userSlice } from './user'

const navbarActions = navbarSlice.actions
const userActions = userSlice.actions
const notificationActions = notificationSlice.actions

export {
  navbarSlice,
  navbarActions,
  userSlice,
  userActions,
  notificationActions,
  notificationSlice,
}
