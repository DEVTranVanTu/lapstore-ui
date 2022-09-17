import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ListParams, Product } from 'models'

export interface ProductState {
  loading: boolean
  list: Product[]
}

const initialState: ProductState = {
  loading: false,
  list: [],
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductList(state) {
      state.loading = true
    },
    fetchProductListSuccess(state, action: PayloadAction<Product[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchProductListFailed(state) {
      state.loading = false
    },
    // fetch product by subCategory
    fetchProductListBySub(state, action: PayloadAction<string>) {
      state.loading = true
    },
    fetchProductListBySubSuccess(state, action: PayloadAction<Product[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchProductListBySubFailed(state) {
      state.loading = false
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
})

// Actions
export const productActions = productSlice.actions

// Selectors
export const selectProductList = (state: RootState) => state.product.list
export const selectProductLoading = (state: RootState) => state.product.loading

export const selectProductListBySub = (state: RootState) => state.product.list
export const selectProductLoadingBySub = (state: RootState) => state.product.loading

// Reducer
const productReducer = productSlice.reducer
export default productReducer
