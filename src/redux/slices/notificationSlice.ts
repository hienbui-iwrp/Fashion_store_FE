import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NotificationState {
  value: string
  type: string
}

const initialState: NotificationState = {
  value: '',
  type: '',
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    setNotificationType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
  },
})

export const { setNotificationValue, setNotificationType } =
  notificationSlice.actions

export default notificationSlice.reducer
