import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthData, AuthResponse, UpdateProfile, User, userInfor } from 'models'

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

export interface updateProfileState {
  loading: boolean
  data: {
    user: User
  }
}

export interface uploadProfilePayload {
  id: string
  data: UpdateProfile
}

const initialUpdateProfileState: updateProfileState = {
  loading: false,
  data: {
    user: {
      _id: '',
      email: '',
      username: '',
      profile: {},
      role: '',
    },
  },
}

const userProfileUpdateSlice = createSlice({
  name: 'updateProfileSlice',
  initialState: initialUpdateProfileState,
  reducers: {
    uploadProfile(state, action: PayloadAction<uploadProfilePayload>) {
      state.loading = true
    },
    uploadProfileSuccess(state, action: PayloadAction<userInfor>) {
      state.loading = false
      state.data = action.payload
    },
    uploadProfileFaild(state) {
      state.loading = false
    },
  },
})

export const userProfileUpdateAction = userProfileUpdateSlice.actions

export const updateProfile = (state: RootState) => state.updateProfile.data
export const updateProfileLoading = (state: RootState) => state.updateProfile.loading

export const userUpdateReducer = userProfileUpdateSlice.reducer

export interface listAdminPayload {
  loading: boolean
  data: User[]
}

const initialListAdminState: listAdminPayload = {
  loading: false,
  data: [
    {
      _id: '',
      email: '',
      username: '',
      profile: {},
      role: '',
    },
  ],
}

const listAdminSlice = createSlice({
  name: 'list admin',
  initialState: initialListAdminState,
  reducers: {
    getListAdmin(state) {
      state.loading = true
    },
    getListAdminSuccess(state, action: PayloadAction<listAdminPayload>) {
      state.loading = false
      state.data = action.payload.data
    },
    getListAdminFaild(state) {
      state.loading = false
    },
  },
})

export const listAdminActions = listAdminSlice.actions

export const listAdmin = (state: RootState) => state.listAdmin.data
export const listAdminLoading = (state: RootState) => state.listAdmin.loading

export const listAdminReducer = listAdminSlice.reducer

export interface verifyResponse {
  success: Boolean
  message: String
}

export interface verifyResquest {
  email: String
  password: String
  username: String
  otp?: String
}

export interface sendEmailPayload {
  loading: boolean
  data: verifyResponse
}

const initialVerifyState: sendEmailPayload = {
  loading: false,
  data: {
    success: false,
    message: '',
  },
}

const verifyEmailSlice = createSlice({
  name: 'verify email',
  initialState: initialVerifyState,
  reducers: {
    verifyEmail(state, action: PayloadAction<verifyResquest>) {
      state.loading = true
    },
    verifyEmailSuccess(state, action: PayloadAction<verifyResponse>) {
      state.loading = false
      state.data = action.payload
    },
    verifyEmailFaild(state) {
      state.loading = false
    },
  },
})

export const verifyEmailActions = verifyEmailSlice.actions

export const verifyResponse = (state: RootState) => state.verifyEmail.data
export const verifyResponseLoading = (state: RootState) => state.verifyEmail.loading

export const verifyEmailReducer = verifyEmailSlice.reducer

export interface registerPayload {
  loading: boolean
  data: verifyResponse
}
const initialRegisterState: registerPayload = {
  loading: false,
  data: {
    success: false,
    message: '',
  },
}
const registerSlice = createSlice({
  name: 'register',
  initialState: initialRegisterState,
  reducers: {
    register(state, action: PayloadAction<verifyResquest>) {
      state.loading = true
    },
    registerSuccess(state, action: PayloadAction<verifyResponse>) {
      state.loading = false
      state.data = action.payload
    },
    registerFaild(state) {
      state.loading = false
    },
  },
})

export const registerActions = registerSlice.actions

export const registerResponse = (state: RootState) => state.register.data
export const registerResponseLoading = (state: RootState) => state.register.loading

export const registerReducer = registerSlice.reducer
