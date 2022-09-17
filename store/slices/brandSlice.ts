import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Brand } from 'models'

export interface BrandState {
  loading: boolean
  list: Brand[]
}

const initialState: BrandState = {
  loading: false,
  list: [],
}

const brandSlice = createSlice({
  name: 'Brand',
  initialState,
  reducers: {
    fetchBrandList(state) {
      state.loading = true
    },
    fetchBrandListSuccess(state, action: PayloadAction<Brand[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchBrandListFailed(state) {
      state.loading = false
    },

  },
})

// Actions
export const brandActions = brandSlice.actions

// Selectors

export const selectBrandList = (state: RootState) => state.brand.list
export const selectBrandLoading = (state: RootState) =>
  state.brand.loading
// Reducer
const brandReducer = brandSlice.reducer
export default brandReducer
