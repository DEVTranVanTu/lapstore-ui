import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ListParams, ListResponse, Product } from 'models'

export interface ProductBySubState {
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

const initialState: ProductBySubState = {
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
export interface productState {
  loading: boolean
  product: Product
}
const initialProductState: productState = {
  loading: false,
  product: {
    productName: '',
    productThumbnail: '',
    description: '',
    price: 0,
    rating: 0,
    discount: 0,
    status: 0,
    quantity: 0,
    specs: [],
  },
}
export interface payload {
  id: string
  params: {
    page: number
    limit: number
  }
}

const productBySubSlice = createSlice({
  name: 'productBySub',
  initialState,
  reducers: {
    fetchProductListBySub(state, action: PayloadAction<payload>) {
      state.loading = true
    },
    fetchProductListBySubSuccess(
      state,
      action: PayloadAction<ListResponse<Product>>
    ) {
      state.data = action.payload
      state.loading = false
    },
    fetchProductListBySubFailed(state) {
      state.loading = false
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
})

const productDetail = createSlice({
  name: 'productDetail',
  initialState: initialProductState,
  reducers: {
    fetchProductDetail(state, action: PayloadAction<string>) {
      state.loading = true
    },
    fetchProductDetailSuccess(state, action: PayloadAction<Product>) {
      state.product = action.payload
      state.loading = false
    },
    fetchProductDetailFailed(state) {
      state.loading = false
    },
  },
})

// Actions
export const productBySubActions = productBySubSlice.actions
export const productDetailActions = productDetail.actions

// Selectors
export const selectProductListBySub = (state: RootState) => state.productBySub.data
export const selectProductLoadingBySub = (state: RootState) =>
  state.productBySub.loading

export const getProductDetail = (state: RootState) => state.productDetail.product
export const getProductDetailLoading = (state: RootState) =>
  state.productDetail.loading

// Reducer
const productBySubReducer = productBySubSlice.reducer
export default productBySubReducer

export const productDetailReducer = productDetail.reducer
