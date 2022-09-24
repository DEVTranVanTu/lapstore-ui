import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthData, AuthResponse, userInfor } from 'models'

export interface userState {
  loading: boolean
  response: AuthResponse
}

const initialState: userState = {
  loading: false,
  response: {
    status: '',
    data: {
      token: '',
      user: {
        _id: '',
        email: '',
        username: '',
        role: '',
      },
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
      state.response = action.payload
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

export const getUserInfor = (state: RootState) => state.user.response
export const getUserInforLoading = (state: RootState) => state.user.loading
// Reducer
const userReducer = userSlice.reducer
export default userReducer

export interface userProfile {
  loading: boolean
  response: userInfor
}

const initialUserProfileState: userProfile = {
  loading: false,
  response: {
    user: {
      _id: '',
      email: '',
      username: '',
      profile: {},
      role: '',
    },
  },
}

const userProfileSlice = createSlice({
  name: 'userSlice',
  initialState: initialUserProfileState,
  reducers: {
    getUserProfile(state, action: PayloadAction<string>) {
      state.loading = true
    },
    getUserProfileSuccess(state, action: PayloadAction<userInfor>) {
      state.loading = false
      state.response = action.payload
    },
    getUserProfileFaild(state) {
      state.loading = false
    },
  },
})

export const userProfileActions = userProfileSlice.actions

export const getUserProfile = (state: RootState) => state.userProfile.response
export const getUserProfileLoading = (state: RootState) => state.userProfile.loading

export const userProfileReducer = userProfileSlice.reducer
