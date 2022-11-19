import { Order } from '@Models/order'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { payload } from './productBySubSlice'

export interface PaymentParams {
  userId: string
  cartId: string
  products: any
  payment: any
  shipping: any
}

export interface PaymentData {
  loading: boolean
  success: boolean
  data: {
    success: boolean
    message: string
  }
}

const initialState: PaymentData = {
  loading: false,
  success: false,
  data: {
    success: false,
    message: '',
  },
}

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    payment(state, action: PayloadAction<PaymentParams>) {
      state.loading = true
    },
    paymentSuccess(state, action: PayloadAction<PaymentData>) {
      state.loading = false
      state.success = true
      state.data = action.payload.data
    },
    paymentFaild(state) {
      state.loading = false
    },
  },
})

// Actions
export const orderActions = orderSlice.actions

// Selectors

export const getOrder = (state: RootState) => state.order.data
export const getOrderLoading = (state: RootState) => state.order.loading
export const paymentSuccess = (state: RootState) => state.order.success
// Reducer
const orderReducer = orderSlice.reducer
export default orderReducer

export interface listOrder {
  loading: boolean
  data: any
}

const initialListOrderState: listOrder = {
  loading: false,
  data: [],
}

const listOrderSlice = createSlice({
  name: 'list order',
  initialState: initialListOrderState,
  reducers: {
    getListOrder(state, action: PayloadAction<payload>) {
      state.loading = true
    },
    getlistOrderSuccess(state, action: PayloadAction<Order>) {
      ;(state.loading = false), (state.data = action.payload)
    },
    getListOrderFaild(state) {
      state.loading = false
    },
  },
})

export const listOrderActions = listOrderSlice.actions

export const getListOrderLoading = (state: RootState) => state.listOrder.loading
export const getListOrderData = (state: RootState) => state.listOrder.data

export const listOrderReducer = listOrderSlice.reducer

export interface cancelResponse {
  success: boolean
  message: string
}
export interface cancelOrder {
  loading: boolean
  data: cancelResponse
}

const initialCancelOrderState: cancelOrder = {
  loading: false,
  data: {
    success: false,
    message: '',
  },
}

const cancelOrderSlice = createSlice({
  name: 'cancel order',
  initialState: initialCancelOrderState,
  reducers: {
    cancelOrder(state, action: PayloadAction<String>) {
      state.loading = true
    },
    cancelOrderSuccess(state, action: PayloadAction<cancelResponse>) {
      state.loading = false
      state.data = action.payload
    },
    cancelOrderFaild(state) {
      state.loading = false
    },
  },
})

export const cancelOrderActions = cancelOrderSlice.actions

export const cancelOrderLoading = (state: RootState) => state.cancelOrder.loading
export const cancelOrderData = (state: RootState) => state.cancelOrder.data

export const cancelOrderReducer = cancelOrderSlice.reducer
