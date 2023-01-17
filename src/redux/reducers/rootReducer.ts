import { combineReducers } from '@reduxjs/toolkit';
import { navbarSlice } from './../slices';
import { userSlice } from './../slices';

export const rootReducer = combineReducers({
  [navbarSlice.name]: navbarSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});
