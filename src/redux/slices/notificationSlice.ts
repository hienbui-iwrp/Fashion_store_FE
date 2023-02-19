import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NotificationState {
  value: string
  type: 'success' | 'info' | 'warning' | 'error'
}

const initialState: NotificationState = {
  value: '',
  type: 'success',
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    setNotificationType: (
      state,
      action: PayloadAction<'success' | 'info' | 'warning' | 'error'>
    ) => {
      state.type = action.payload
    },
  },
})

export const { setNotificationValue, setNotificationType } =
  notificationSlice.actions

export default notificationSlice.reducer
