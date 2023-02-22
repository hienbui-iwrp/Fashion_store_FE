import { notificationSlice } from './../slices/notificationSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { navbarSlice } from './../slices'
import { userSlice } from './../slices'
import { productsSlice } from './../slices'

export const rootReducer = combineReducers({
  [navbarSlice.name]: navbarSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
})
