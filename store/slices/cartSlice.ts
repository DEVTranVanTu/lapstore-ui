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
  addSuccess?: boolean
  removeSuccess?: boolean
  data: Cart
}

const initialState: cartState = {
  loading: false,
  removeSuccess: false,
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
    removeCartItem(state, action: PayloadAction<any>) {
      state.loading = true
    },
    removeCartItemSuccess(state) {
      state.loading = false
      state.removeSuccess = true
    },
    removeCartItemFaild(state) {
      state.loading = false
    },
  },
})

// Actions
export const cartActions = cartSlice.actions

// Selectors

export const getCart = (state: RootState) => state.cart.data
export const getCartLoading = (state: RootState) => state.cart.loading
export const removeSuccess = (state: RootState) => state.cart.removeSuccess
// Reducer
const cartReducer = cartSlice.reducer
export default cartReducer

const addToCartState: cartState = {
  loading: false,
  addSuccess: false,
  data: {
    userId: '',
    products: [],
    status: '',
  },
}

const addToCartSlice = createSlice({
  name: 'addtocart',
  initialState: addToCartState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCart>) {
      state.loading = true
    },
    addToCartSuccess(state, action: PayloadAction<AddToCart>) {
      state.loading = false
      state.addSuccess = true
    },
    addToCartFaild(state) {
      state.loading = false
    },
  },
})
export const addToCartActions = addToCartSlice.actions
export const addToCartLoading = (state: RootState) => state.addToCart.loading
export const addToCartSuccess = (state: RootState) => state.addToCart.addSuccess
export const addToCartReducer = addToCartSlice.reducer
