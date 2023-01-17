import { navbarSlice } from './navbarSlice';
import { userSlice } from './user';

const navbarActions = navbarSlice.actions;
const userActions = userSlice.actions;

export {
  navbarSlice,
  navbarActions,
  userSlice,
  userActions,
};
