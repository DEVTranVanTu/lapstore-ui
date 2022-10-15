import { Cart, cartResponse } from '@Models/cart'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AddToCart {
  userId: string
  productId: string
  quantity: number
}

export interface cartState {
  loading: boolean
  data: Cart
}

const initialState: cartState = {
  loading: false,
  data: {
    userId: '',
    products: [],
    status: '',
  },
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getCartByUser(state, action: PayloadAction<string>) {
      state.loading = true
    },
    getCartByUserSuccess(state, action: PayloadAction<cartResponse>) {
      state.loading = false
      state.data = action.payload.data
    },
    getCartByUserFaild(state) {
      state.loading = false
    },
    addToCart(state, action: PayloadAction<AddToCart>) {
      state.loading = true
    },
    addToCartSuccess(state, action: PayloadAction<AddToCart>) {
      state.loading = false
    },
    addToCartFaild(state) {
      state.loading = false
    },
  },
})

// Actions
export const cartActions = cartSlice.actions

// Selectors

export const getCart = (state: RootState) => state.cart.data
export const getCartLoading = (state: RootState) => state.cart.loading
// Reducer
const cartReducer = cartSlice.reducer
export default cartReducer
