import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CategoryNav, ListParams } from 'models'

export interface CategoryNavState {
  loading: boolean
  list: CategoryNav[]
}

const initialState: CategoryNavState = {
  loading: false,
  list: [],
}

const categoryNavSlice = createSlice({
  name: 'categoryNav',
  initialState,
  reducers: {
    fetchCategoryNavList(state) {
      state.loading = true
    },
    fetchCategoryNavListSuccess(state, action: PayloadAction<CategoryNav[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchCategoryNavListFailed(state) {
      state.loading = false
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
})

// Actions
export const categoryNavActions = categoryNavSlice.actions

// Selectors

export const selectCategoryNavList = (state: RootState) => state.categoryNav.list
export const selectCategoryNavLoading = (state: RootState) =>
  state.categoryNav.loading
// Reducer
const categoryNavReducer = categoryNavSlice.reducer
export default categoryNavReducer
