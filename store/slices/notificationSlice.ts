import { Notification } from '@Models/notification'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface NotificationState {
  loading: boolean
  data: Notification[]
}

const initialState: NotificationState = {
  loading: false,
  data: [
    {
      userId: '',
      image: '',
      typeOfNotification: '',
      status: '',
      message: '',
      idToReview: '',
    },
  ],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    getNotification(state, action: PayloadAction<String>) {
      state.loading = true
    },
    getNotificationSuccess(state, action: PayloadAction<Notification[]>) {
      state.loading = false
      state.data = action.payload
    },
    getNotificationFaild(state) {
      state.loading = false
    },
  },
})

// Actions
export const notificationActions = notificationSlice.actions

// Selectors

export const getNotifications = (state: RootState) => state.notification.data
export const getNotificationLoading = (state: RootState) =>
  state.notification.loading
// Reducer
const notificationReducer = notificationSlice.reducer
export default notificationReducer

export interface DeleteNotificationState {
  loading: boolean
}

const deleteInitialState: DeleteNotificationState = {
  loading: false,
}

const deleteNotificationSlice = createSlice({
  name: 'delete notification',
  initialState: deleteInitialState,
  reducers: {
    deleteNotification(state, action: PayloadAction<String>) {
      state.loading = true
    },
    deleteNotificationSuccess(state) {
      state.loading = false
    },
    deleteNotificationFaild(state) {
      state.loading = false
    },
  },
})

export const deleteNotificationActions = deleteNotificationSlice.actions

export const getDeleteNotificationLoading = (state: RootState) =>
  state.deleteNotification.loading

export const deleteNotificationReducer = deleteNotificationSlice.reducer

export interface EditNotificationState {
  loading: boolean
}

const EditInitialState: EditNotificationState = {
  loading: false,
}

const editNotificationSlice = createSlice({
  name: 'edit notification',
  initialState: EditInitialState,
  reducers: {
    editNotification(state, action: PayloadAction<String>) {
      state.loading = true
    },
    editNotificationSuccess(state) {
      state.loading = false
    },
    editNotificationFaild(state) {
      state.loading = false
    },
  },
})

export const editNotificationActions = editNotificationSlice.actions

export const getEditNotificationLoading = (state: RootState) =>
  state.editNotification.loading

export const editNotificationReducer = editNotificationSlice.reducer
