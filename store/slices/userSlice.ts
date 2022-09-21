import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthData, AuthResponse } from 'models'

export interface userState {
  loading: boolean
  data: AuthResponse
}

const initialState: userState = {
  loading: false,
  data: {
    token: '',
    user: {
      _id: '',
      email: '',
      username: '',
      role: '',
    },
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthData>) {
      state.loading = true
    },
    loginSuccess(state, action: PayloadAction<AuthResponse>) {
      state.data = action.payload
      state.loading = false
    },
    loginFailed(state) {
      state.loading = false
    },
  },
})

// Actions
export const userActions = userSlice.actions

// Selectors

export const getUserInfor = (state: RootState) => state.user.data
export const getUserInforLoading = (state: RootState) => state.user.loading
// Reducer
const userReducer = userSlice.reducer
export default userReducer
