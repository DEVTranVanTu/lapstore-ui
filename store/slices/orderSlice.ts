import { Cart, cartResponse } from '@Models/cart'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

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
