import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface globalState {
  isLogin: boolean
  isLoading: boolean
}

const initialState: globalState = {
  isLogin: false,
  isLoading: false,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeLogin(state) {
      state.isLoading = true
    },
    changeLoginSuccess(state) {
      state.isLoading = false
      state.isLogin = true
    },
    changeLoginFailed(state) {
      state.isLoading = false
      state.isLogin = false
    },
  },
})

// Actions
export const globalActions = globalSlice.actions

// Selectors

export const getGlobalLogin = (state: RootState) => state.globalLogin.isLogin
export const getGlobalLoginLoading = (state: RootState) =>
  state.globalLogin.isLoading
// Reducer
const globalReducer = globalSlice.reducer
export default globalReducer
