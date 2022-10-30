import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ProvinceState {
  loading: boolean
  list: any
}

const initialState: ProvinceState = {
  loading: false,
  list: [],
}

const pporvinceSlice = createSlice({
  name: 'Province',
  initialState,
  reducers: {
    fetchProvinceList(state) {
      state.loading = true
    },
    fetchProvinceListSuccess(state, action: PayloadAction<any>) {
      state.list = action.payload
      state.loading = false
    },
    fetchProvinceListFailed(state) {
      state.loading = false
    },
  },
})

// Actions
export const provinceActions = pporvinceSlice.actions

// Selectors

export const selectProvinceList = (state: RootState) => state.province.list
export const selectProvinceLoading = (state: RootState) => state.province.loading
// Reducer
const provinceReducer = pporvinceSlice.reducer
export default provinceReducer
