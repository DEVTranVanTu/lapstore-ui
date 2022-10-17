import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Inventory, ListParams, ListResponse, Params, Product } from 'models'

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
    fetchInventoryList(state, action: PayloadAction<Params>) {
      state.loading = true
    },
    fetchInventoryListSuccess(
      state,
      action: PayloadAction<ListResponse<Inventory>>
    ) {
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

export interface ParamsSearch {
  keyword: string
  params: Params
}
export interface SearchInventoryState {
  loading: boolean
  data: {
    data: Product[]
    pagination: {
      page: number
      limit: number
      totals: number
      totalRows: number
      totalPages: number
    }
  }
}

const initialSearchState: SearchInventoryState = {
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

const inventorySearchSlice = createSlice({
  name: 'search inventory',
  initialState: initialSearchState,
  reducers: {
    fetchSearchInventoryList(state, action: PayloadAction<ParamsSearch>) {
      state.loading = true
    },
    fetchSearchInventoryListSuccess(
      state,
      action: PayloadAction<ListResponse<Product>>
    ) {
      state.loading = false
      state.data = action.payload
    },
    fetchSearchInventoryListFailed(state) {
      state.loading = false
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
})

// Actions
export const inventorySearchActions = inventorySearchSlice.actions

// Selectors
export const selectInventoryListSearch = (state: RootState) =>
  state.inventorySearch.data
export const selectInventorySearchLoading = (state: RootState) =>
  state.inventorySearch.loading

// Reducer
export const inventorySearchReducer = inventorySearchSlice.reducer

export interface ParamsBrand {
  id: string
  params: Params
}
export interface InventoryByBrandState {
  loading: boolean
  data: {
    data: Product[]
    pagination: {
      page: number
      limit: number
      totals: number
      totalRows: number
      totalPages: number
    }
  }
}

const initialInventoryByBrandState: InventoryByBrandState = {
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

const inventoryByBrandSlice = createSlice({
  name: 'inventory by brand',
  initialState: initialInventoryByBrandState,
  reducers: {
    fetchInventoryListByBrand(state, action: PayloadAction<ParamsBrand>) {
      state.loading = true
    },
    fetchInventoryListByBrandSuccess(
      state,
      action: PayloadAction<ListResponse<Product>>
    ) {
      state.loading = false
      state.data = action.payload
    },
    fetchInventoryListByBrandFailed(state) {
      state.loading = false
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
})

// Actions
export const inventoryByBrandActions = inventoryByBrandSlice.actions

// Selectors
export const selectInventoryListByBrand = (state: RootState) =>
  state.inventoryByBrand.data
export const selectInventoryBybrandLoading = (state: RootState) =>
  state.inventoryByBrand.loading

// Reducer
export const inventoryByBrandReducer = inventoryByBrandSlice.reducer
