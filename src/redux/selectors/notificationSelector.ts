import { RootState } from '@/utils/types'

export const selectNotification = (state: RootState) => {
  return state.notification
}
