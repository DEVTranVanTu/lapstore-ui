import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Inventory, ListParams, ListResponse, Params } from 'models'

export interface InventoryState {
  loading: boolean
  data: {
    data: Inventory[]
    pagination: {
      page: number
      limit: number
      totals: number
      totalRows: number
      totalPages: number
    }
  }
}

const initialState: InventoryState = {
  loading: false,
  data: {
    data: [],
    pagination: {
      page: 0,
      limit: 0,
      totals: 0,
      totalRows: 0,
      totalPages: 0,
    },
  },
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    fetchInventoryList(state,action:PayloadAction<Params>) {
      state.loading = true
    },
    fetchInventoryListSuccess(state, action: PayloadAction<ListResponse<Inventory>>) {
      state.data = action.payload
      state.loading = false
    },
    fetchInventoryListFailed(state) {
      state.loading = false
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
})

// Actions
export const inventoryActions = inventorySlice.actions

// Selectors
export const selectInventoryList = (state: RootState) => state.inventory.data
export const selectInventoryLoading = (state: RootState) => state.inventory.loading

// Reducer
const inventoryReducer = inventorySlice.reducer
export default inventoryReducer
