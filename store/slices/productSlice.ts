import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ListParams, Product, topProduct } from 'models'

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

const topProductDiscountInitialState: ProductState = {
  loading: false,
  list: [],
}

const topProductDiscountSlice = createSlice({
  name: 'top product slice',
  initialState: topProductDiscountInitialState,
  reducers: {
    // fetch top product discount
    fetchTopProductDiscountList(state) {
      state.loading = true
    },
    fetchTopProductDiscountListSuccess(state, action: PayloadAction<Product[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchTopProductDiscountListFailed(state) {
      state.loading = false
    },
  },
})

export const topProductDiscountActions = topProductDiscountSlice.actions

export const selectTopProductDiscount = (state: RootState) =>
  state.topProductDiscount.list
export const selectTopProductDiscountLoading = (state: RootState) =>
  state.topProductDiscount.loading

export const topProductDiscountReducer = topProductDiscountSlice.reducer

export interface TopProductState {
  loading: boolean
  list: topProduct[]
}

const initialTopProductState: TopProductState = {
  loading: false,
  list: [],
}

const topProductSlice = createSlice({
  name: 'top product',
  initialState: initialTopProductState,
  reducers: {
    fetchTopProductList(state) {
      state.loading = true
    },
    fetchTopProductListSuccess(state, action: PayloadAction<topProduct[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchTopProductListFailed(state) {
      state.loading = false
    },
  },
})

// Actions
export const topProductActions = topProductSlice.actions

// Selectors
export const selectTopProductList = (state: RootState) => state.topProducts.list
export const selectTopProductLoading = (state: RootState) =>
  state.topProducts.loading

// Reducer
export const topProductReducer = topProductSlice.reducer
